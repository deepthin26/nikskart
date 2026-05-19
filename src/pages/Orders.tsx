import { Link } from 'react-router-dom';
import type { Order } from '../hooks/useOrders';

interface OrdersProps {
  orders: Order[];
  user: {
    authenticated: boolean;
    email: string;
    name: string;
  };
}

export default function Orders({ orders, user }: OrdersProps) {
  if (!user.authenticated) {
    return (
      <main className="page-content empty-cart">
        <h1>Sign in to view your orders</h1>
        <p>Order history is available once you sign in.</p>
        <Link className="primary-button" to="/login">
          Sign in
        </Link>
      </main>
    );
  }

  const userOrders = orders.filter((order) => order.userEmail === user.email);

  if (userOrders.length === 0) {
    return (
      <main className="page-content empty-cart">
        <h1>No orders yet</h1>
        <p>Once you place an order, it will appear here.</p>
        <Link className="primary-button" to="/">
          Shop now
        </Link>
      </main>
    );
  }

  return (
    <main className="page-content orders-page">
      <h1>My Orders</h1>
      <div className="orders-list">
        {userOrders.map((order) => (
          <article key={order.id} className="order-card">
            <div className="order-meta">
              <div>
                <strong>Order ID:</strong> {order.id}
              </div>
              <div>
                <strong>Status:</strong> {order.status}
              </div>
              <div>
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="order-details">
              <div>
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item) => (
                    <li key={`${order.id}-${item.id}`}>
                      {item.name} x{item.quantity} — ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Payment:</strong> {order.paymentMethod}
              </div>
              <div>
                <strong>Delivery:</strong> {order.address.addressType}, {order.address.city}
              </div>
              <div className="order-total">
                <span>Total</span>
                <strong>₹{order.grandTotal}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
