import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, Product } from '../data/products';

interface ProductDetailProps {
  cart: { addItem: (product: Product) => void };
  wishlist: { toggleItem: (product: Product) => void; hasItem: (id: string) => boolean };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="pd-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? 'star filled' : 'star'}>★</span>
      ))}
      <span className="pd-rating-val">{rating} / 5</span>
    </span>
  );
}

export default function ProductDetail({ cart, wishlist }: ProductDetailProps) {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  useEffect(() => {
    if (!product) return;

    document.title = `${product.name} – Buy Online at Nikskart | ₹${product.price}`;

    const setMeta = (sel: string, val: string) =>
      document.querySelector(sel)?.setAttribute('content', val);

    setMeta('meta[name="description"]',
      `Buy ${product.name} at ₹${product.price}. ${product.description} Shop ethnic wear at Nikskart with free delivery above ₹2,999.`);
    setMeta('meta[property="og:title"]', `${product.name} – Nikskart`);
    setMeta('meta[property="og:description"]', `${product.description} ₹${product.price} only at Nikskart.`);
    setMeta('meta[property="og:image"]', product.image);
    setMeta('meta[property="og:url"]', window.location.href);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', window.location.href);

    const schema = {
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
    };

    const existing = document.getElementById('product-schema');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = 'product-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.title = 'Nikskart – Ethnic Sarees, Kurtis & Jewellery Online Shopping';
      document.getElementById('product-schema')?.remove();
    };
  }, [product]);

  if (!product) {
    return (
      <main className="page-content empty-cart">
        <h1>Product not found</h1>
        <p>This product may have been removed or the link is incorrect.</p>
        <Link className="primary-button" to="/">Back to Store</Link>
      </main>
    );
  }

  const categoryPath =
    product.category === 'Sarees' ? '/sarees' :
    product.category === 'Kurtis' ? '/kurtis' :
    '/artificial-jewellery';

  const isWishlisted = wishlist.hasItem(product.id);

  return (
    <main className="page-content product-detail-page">
      {/* Breadcrumb */}
      <nav className="pd-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={categoryPath}>{product.category}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="pd-card">
        {/* Image panel */}
        <div className="pd-image-wrap">
          <img
            src={product.image}
            alt={`${product.name} – Buy ${product.category} online at Nikskart`}
            className="pd-image"
            loading="lazy"
          />
          {product.badge && <span className="pd-image-badge">{product.badge}</span>}
        </div>

        {/* Info panel */}
        <div className="pd-info">
          <p className="pd-category">{product.category}</p>
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-rating-row">
            <StarRating rating={product.rating} />
            <span className="pd-review-count">42 reviews</span>
          </div>

          <div className="pd-price-row">
            <span className="pd-price">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="pd-discount">{product.discount}</span>
            <span className="pd-tax-note">Inclusive of all taxes</span>
          </div>

          <p className="pd-description">{product.description}</p>

          {/* Delivery info */}
          <div className="pd-delivery-strip">
            <div className="pd-delivery-item">
              <span className="pd-delivery-icon">🚚</span>
              <div>
                <strong>Free Delivery</strong>
                <span>On orders above ₹2,999</span>
              </div>
            </div>
            <div className="pd-delivery-item">
              <span className="pd-delivery-icon">↩</span>
              <div>
                <strong>15-Day Returns</strong>
                <span>Hassle-free returns</span>
              </div>
            </div>
            <div className="pd-delivery-item">
              <span className="pd-delivery-icon">🔒</span>
              <div>
                <strong>Secure Payment</strong>
                <span>UPI, Card, Net Banking</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pd-actions">
            <button className="primary-button pd-add-btn" onClick={() => cart.addItem(product)}>
              Add to Bag
            </button>
            <button
              className={`pd-wishlist-btn${isWishlisted ? ' saved' : ''}`}
              onClick={() => wishlist.toggleItem(product)}
            >
              {isWishlisted ? '♥ Saved' : '♡ Wishlist'}
            </button>
          </div>

          <Link className="pd-checkout-link" to="/checkout">
            Buy Now →
          </Link>
        </div>
      </div>
    </main>
  );
}
