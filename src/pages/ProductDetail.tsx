import { useParams, Link } from 'react-router-dom';
import { products, Product } from '../data/products';

interface ProductDetailProps {
  cart: {
    addItem: (product: Product) => void;
  };
  wishlist: {
    toggleItem: (product: Product) => void;
    hasItem: (id: string) => boolean;
  };
}

export default function ProductDetail({ cart, wishlist }: ProductDetailProps) {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <main className="page-content">
        <h1>Product not found</h1>
        <Link to="/">Back to store</Link>
      </main>
    );
  }

  return (
    <main className="page-content product-detail-page">
      <div className="product-detail-card">
        <img src={product.image} alt={product.name} className="product-detail-image" />
        <div className="product-detail-info">
          <span className="badge">{product.badge}</span>
          <h1>{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <div className="price-row">
            <span className="price">₹{product.price}</span>
            <span className="discount">{product.discount}</span>
          </div>
          <p className="rating">Rating: {product.rating} ★</p>
          <p className="product-description">{product.description}</p>
          <div className="product-actions">
            <button className="primary-button" onClick={() => cart.addItem(product)}>
              Add to Cart
            </button>
            <button className="secondary-button" onClick={() => wishlist.toggleItem(product)}>
              {wishlist.hasItem(product.id) ? 'Saved' : 'Save for later'}
            </button>
            <Link className="secondary-button" to="/cart">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
