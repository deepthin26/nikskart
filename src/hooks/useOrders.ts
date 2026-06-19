import { useEffect, useState } from 'react';
import type { Address } from './useAuth';
import type { Product } from '../data/products';
import { apiUrl } from '../lib/api';
import { supabase } from '../lib/supabase';

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  totalPrice: number;
  shipping: number;
  grandTotal: number;
  paymentMethod: string;
  address: Address;
  createdAt: string;
  status: string;
}

export function useOrders(userEmail: string | null, userName: string) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!userEmail) {
      setOrders([]);
      return;
    }

    const email = userEmail;
    const controller = new AbortController();

    async function loadOrders() {
      try {
        const encoded = encodeURIComponent(email);
        const response = await fetch(apiUrl(`/api/orders?userEmail=${encoded}`), {
          signal: controller.signal
        });
        if (!response.ok) {
          setOrders([]);
          return;
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch {
        setOrders([]);
      }
    }

    loadOrders();

    // Live status updates via Supabase Realtime
    const channel = supabase
      .channel(`orders-${email}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `user_email=eq.${email}` },
        (payload) => {
          const updated = payload.new as { id: string; status: string };
          setOrders((cur) =>
            cur.map((o) => (o.id === updated.id ? { ...o, status: updated.status } : o))
          );
        }
      )
      .subscribe();

    return () => {
      controller.abort();
      supabase.removeChannel(channel);
    };
  }, [userEmail]);

  const addOrder = async (
    order: Omit<Order, 'id' | 'createdAt' | 'status' | 'userEmail' | 'userName'> & {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
    }
  ): Promise<Order> => {
    if (!userEmail || !userName) {
      throw new Error('User must be signed in to place an order.');
    }

    const response = await fetch(apiUrl('/api/orders'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...order, userEmail, userName })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server error ${response.status} – is the backend running on port 4000?`);
    }

    const createdOrder: Order = await response.json();
    setOrders((current) => [createdOrder, ...current]);
    return createdOrder;
  };

  return { orders, addOrder };
}
