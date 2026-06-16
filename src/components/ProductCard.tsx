import { Link } from 'react-router-dom';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  addItem: (product: Product) => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductCard({ product, addItem, toggleWishlist, isWishlisted }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" width="400" height="500" />
      </Link>
      <div className="product-card-body">
        <div className="product-card-top">
          <span className="badge small">{product.badge}</span>
          <span className="price">₹{product.price}</span>
        </div>
        <Link to={`/product/${product.id}`} className="product-title">
          {product.name}
        </Link>
        <p className="product-category">{product.category}</p>
        <div className="card-footer">
          <span className="rating">{product.rating} ★</span>
          <div className="card-actions">
            <button className="secondary-button" onClick={() => addItem(product)}>
              Add to Bag
            </button>
            <button className="text-button" onClick={() => toggleWishlist(product)}>
              {isWishlisted ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
