import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useToast } from '../context/ToastContext';
import { trackAddToCart } from '../hooks/useAnalytics';

interface ProductCardProps {
  product: Product;
  addItem: (product: Product) => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductCard({ product, addItem, toggleWishlist, isWishlisted }: ProductCardProps) {
  const { addToast } = useToast();

  const handleAddToBag = () => {
    addItem(product);
    addToast(`Added to bag — ${product.name}`);
    trackAddToCart(product.name, product.price);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    addToast(isWishlisted ? 'Removed from wishlist' : `Saved — ${product.name}`);
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-image-link">
        <img src={product.image} alt={`${product.name} – Buy ${product.category} online | Nikskart`} loading="lazy" decoding="async" width="400" height="500" />
        <div className="product-image-overlay">
          <span className="product-overlay-btn">View Details</span>
        </div>
      </Link>
      <button
        className={`product-wishlist-btn${isWishlisted ? ' saved' : ''}`}
        onClick={handleToggleWishlist}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isWishlisted ? '♥' : '♡'}
      </button>
      <div className="product-card-body">
        <div className="product-card-top">
          <span className="badge small">{product.badge}</span>
          <span className="price">₹{product.price}</span>
        </div>
        <Link to={`/product/${product.slug}`} className="product-title">
          {product.name}
        </Link>
        <p className="product-category">{product.category}</p>
        <div className="card-footer">
          <span className="rating">{'★'.repeat(Math.round(product.rating))} {product.rating}</span>
          <button className="card-add-btn" onClick={handleAddToBag}>
            + Bag
          </button>
        </div>
      </div>
    </article>
  );
}
