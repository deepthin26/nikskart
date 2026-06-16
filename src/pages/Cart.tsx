import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useSeoMeta } from '../hooks/useSeoMeta';

interface CartProps {
  cart: {
    uniqueItems: (Product & { quantity: number })[];
    totalCount: number;
    totalPrice: number;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, change: number) => void;
  };
  wishlist: {
    addItem: (product: Product) => void;
  };
}

export default function Cart({ cart, wishlist }: CartProps) {
  useSeoMeta('Your Cart – Nikskart | Ethnic Sarees & Kurtis', 'Review your selected ethnic wear items — sarees, kurtis, lehengas and jewellery. Free delivery above ₹2999 at Nikskart.');
  return (
    <main className="page-content cart-page">
      <div className="cart-header">
        <h1>Your Bag</h1>
        <p>{cart.totalCount} item(s) selected</p>
      </div>
      {cart.uniqueItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link className="primary-button" to="/">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {cart.uniqueItems.map((product) => (
              <div key={product.id} className="cart-item">
                <img src={product.image} alt={product.name} />
                <div className="cart-item-info">
                  <h2>{product.name}</h2>
                  <p>{product.category}</p>
                  <span className="price">₹{product.price}</span>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button
                        className="quantity-button"
                        type="button"
                        onClick={() => cart.updateQuantity(product.id, -1)}
                        disabled={product.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="quantity-button"
                        type="button"
                        onClick={() => cart.updateQuantity(product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-actions-row">
                      <button
                        className="text-button"
                        type="button"
                        onClick={() => {
                          wishlist.addItem(product);
                          cart.removeItem(product.id);
                        }}
                      >
                        Save for later
                      </button>
                      <button className="text-button" onClick={() => cart.removeItem(product.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <p>Total items: {cart.totalCount}</p>
            <p className="total-price">Total price: ₹{cart.totalPrice}</p>
            <Link className="primary-button" to="/checkout">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
