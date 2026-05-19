import { useEffect, useState } from 'react';
import type { Address } from './useAuth';
import type { Product } from '../data/products';

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
        const response = await fetch(`/api/orders?userEmail=${encoded}`, {
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
    return () => controller.abort();
  }, [userEmail]);

  const addOrder = async (
    order: Omit<Order, 'id' | 'createdAt' | 'status' | 'userEmail' | 'userName'>
  ): Promise<Order> => {
    if (!userEmail || !userName) {
      throw new Error('User must be signed in to place an order.');
    }

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...order,
        userEmail,
        userName
      })
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
