import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Order } from '../hooks/useOrders';

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders/all');
        if (!response.ok) {
          setOrders([]);
          return;
        }

        const data: Order[] = await response.json();
        setOrders(data);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const customers = useMemo(() => {
    const map = new Map<string, { email: string; name: string; orders: number; totalSpend: number; lastOrder: string }>();

    orders.forEach((order) => {
      const existing = map.get(order.userEmail);
      const orderValue = order.grandTotal;
      if (existing) {
        map.set(order.userEmail, {
          ...existing,
          orders: existing.orders + 1,
          totalSpend: existing.totalSpend + orderValue,
          lastOrder: order.createdAt > existing.lastOrder ? order.createdAt : existing.lastOrder
        });
      } else {
        map.set(order.userEmail, {
          email: order.userEmail,
          name: order.userName,
          orders: 1,
          totalSpend: orderValue,
          lastOrder: order.createdAt
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => b.orders - a.orders);
  }, [orders]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.grandTotal, 0);

  return (
    <main className="page-content dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Customer and order analytics powered by your backend data.</p>
        </div>
        <Link className="primary-button" to="/account">
          Go to My Account
        </Link>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <span>Total Customers</span>
          <strong>{customers.length}</strong>
        </div>
        <div className="metric-card">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>
        <div className="metric-card">
          <span>Total Revenue</span>
          <strong>₹{totalRevenue}</strong>
        </div>
      </div>

      {loading ? (
        <p>Loading customer and order data...</p>
      ) : (
        <>
          <section className="dashboard-section">
            <h2>Customer List</h2>
            {customers.length === 0 ? (
              <p>No customers found yet.</p>
            ) : (
              <div className="customer-table">
                <div className="table-row table-header">
                  <span>Customer</span>
                  <span>Orders</span>
                  <span>Total Spent</span>
                  <span>Last Order</span>
                </div>
                {customers.map((customer) => (
                  <div key={customer.email} className="table-row">
                    <span>{customer.name} / {customer.email}</span>
                    <span>{customer.orders}</span>
                    <span>₹{customer.totalSpend}</span>
                    <span>{new Date(customer.lastOrder).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="dashboard-section">
            <h2>Order List</h2>
            {orders.length === 0 ? (
              <p>No orders have been placed yet.</p>
            ) : (
              <div className="orders-table">
                <div className="table-row table-header">
                  <span>Order ID</span>
                  <span>Customer</span>
                  <span>Amount</span>
                  <span>Status</span>
                  <span>Date</span>
                </div>
                {orders.map((order) => (
                  <div key={order.id} className="table-row">
                    <span>{order.id}</span>
                    <span>{order.userName}</span>
                    <span>₹{order.grandTotal}</span>
                    <span>{order.status}</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
