import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useSeoMeta } from '../hooks/useSeoMeta';

interface WishlistProps {
  wishlist: {
    items: Product[];
    removeItem: (id: string) => void;
  };
  cart: {
    addItem: (product: Product) => void;
  };
}

export default function Wishlist({ wishlist, cart }: WishlistProps) {
  useSeoMeta('My Wishlist – Nikskart | Saved Ethnic Wear', 'Your saved ethnic wear at Nikskart — sarees, kurtis, lehengas and jewellery you love.');
  return (
    <main className="page-content wishlist-page">
      <div className="wishlist-header">
        <h1>Saved for Later</h1>
        <p>{wishlist.items.length} item(s) in your wishlist</p>
      </div>
      {wishlist.items.length === 0 ? (
        <div className="empty-cart">
          <p>Your wishlist is empty.</p>
          <Link className="primary-button" to="/">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-items">
          {wishlist.items.map((product) => (
            <div key={product.id} className="cart-item wishlist-item">
              <img src={product.image} alt={product.name} />
              <div className="cart-item-info">
                <h2>{product.name}</h2>
                <p>{product.category}</p>
                <span className="price">₹{product.price}</span>
                <div className="product-actions">
                  <button
                    className="primary-button"
                    onClick={() => {
                      cart.addItem(product);
                      wishlist.removeItem(product.id);
                    }}
                  >
                    Add to Bag
                  </button>
                  <button className="text-button" onClick={() => wishlist.removeItem(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
