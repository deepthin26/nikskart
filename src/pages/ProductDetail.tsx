import { useEffect } from 'react';
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

  useEffect(() => {
    if (product) {
      document.title = `${product.name} – Buy Online at Nikskart | ₹${product.price}`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', `Buy ${product.name} at ₹${product.price}. ${product.description} Shop ethnic wear at Nikskart with free delivery above ₹2999.`);

      // Product structured data
      const script = document.getElementById('product-schema') || document.createElement('script');
      script.id = 'product-schema';
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image,
        description: product.description,
        brand: { '@type': 'Brand', name: 'Nikskart' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: product.price,
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'Nikskart' }
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          bestRating: 5,
          reviewCount: 42
        }
      });
      document.head.appendChild(script);
    }
    return () => {
      document.title = 'Nikskart – Ethnic Sarees, Kurtis & Jewellery Online Shopping';
      document.getElementById('product-schema')?.remove();
    };
  }, [product]);

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
        <img src={product.image} alt={`${product.name} – Buy ${product.category} online at Nikskart`} className="product-detail-image" loading="lazy" />
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
