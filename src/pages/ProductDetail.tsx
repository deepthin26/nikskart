import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { useToast } from '../context/ToastContext';

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
    </span>
  );
}

export default function ProductDetail({ cart, wishlist }: ProductDetailProps) {
  const { productId } = useParams();
  const { addToast } = useToast();
  const { products, loading } = useProducts();
  const imgRef = useRef<HTMLImageElement>(null);

  const product = products.find((item) => item.id === productId);

  // Mouse-tracking zoom — updates transform-origin in real time
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  useEffect(() => {
    if (!product) return;

    document.title = `${product.name} – Buy Online at Nikskart | ₹${product.price}`;

    const setMeta = (sel: string, val: string) =>
      document.querySelector(sel)?.setAttribute('content', val);

    setMeta('meta[name="description"]',
      `Buy ${product.name} at ₹${product.price}. ${product.description} Shop ethnic wear at Nikskart.`);
    setMeta('meta[property="og:title"]', `${product.name} – Nikskart`);
    setMeta('meta[property="og:description"]', `${product.description} ₹${product.price} only at Nikskart.`);
    setMeta('meta[property="og:image"]', product.image);
    setMeta('meta[property="og:url"]', window.location.href);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', window.location.href);

    const catSlug = product.category === 'Sarees' ? 'sarees'
      : product.category === 'Kurtis' ? 'kurtis' : 'artificial-jewellery';
    const base = 'https://www.nikskart.com';

    const schema = [
      {
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
          url: `${base}/product/${product.id}`,
          seller: { '@type': 'Organization', name: 'Nikskart', url: base }
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          bestRating: 5,
          reviewCount: 42
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: base },
          { '@type': 'ListItem', position: 2, name: product.category, item: `${base}/${catSlug}` },
          { '@type': 'ListItem', position: 3, name: product.name }
        ]
      }
    ];

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

  if (loading && !product) {
    return (
      <main className="page-content product-detail-page">
        <div className="pd-skeleton">
          <div className="pd-skeleton-img" />
          <div className="pd-skeleton-info">
            <div className="pd-skeleton-line wide" />
            <div className="pd-skeleton-line" />
            <div className="pd-skeleton-line narrow" />
          </div>
        </div>
      </main>
    );
  }

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

  // Calculate original/MRP price from discount string e.g. "30% off"
  const discountPct = parseInt(product.discount || '0');
  const originalPrice = discountPct > 0
    ? Math.round(product.price / (1 - discountPct / 100))
    : null;

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

        {/* ── Image panel ── */}
        <div
          className="pd-image-wrap"
          onMouseMove={handleMouseMove}
        >
          <img
            ref={imgRef}
            src={product.image}
            alt={`${product.name} – Buy ${product.category} online at Nikskart`}
            className="pd-image"
            loading="eager"
          />
          {product.badge && <span className="pd-image-badge">{product.badge}</span>}
          <span className="pd-zoom-hint">Hover to zoom</span>
        </div>

        {/* ── Info panel ── */}
        <div className="pd-info">
          <p className="pd-category">{product.category}</p>
          <h1 className="pd-title">{product.name}</h1>

          {/* Rating */}
          <div className="pd-rating-row">
            <div className="pd-rating-chip">
              <span className="pd-rating-num">{product.rating}</span>
              <StarRating rating={product.rating} />
            </div>
            <span className="pd-review-sep">|</span>
            <span className="pd-review-count">42 Ratings &amp; Reviews</span>
          </div>

          {/* Price */}
          <div className="pd-price-block">
            <div className="pd-price-row">
              <span className="pd-price">₹{product.price.toLocaleString('en-IN')}</span>
              {originalPrice && (
                <span className="pd-original-price">₹{originalPrice.toLocaleString('en-IN')}</span>
              )}
              {product.discount && (
                <span className="pd-discount">{product.discount}</span>
              )}
            </div>
            <p className="pd-tax-note">inclusive of all taxes</p>
          </div>

          {/* Product details */}
          <div className="pd-details-box">
            <h3 className="pd-details-title">Product Details</h3>
            <p className="pd-description">{product.description}</p>
          </div>

          {/* Delivery strip */}
          <div className="pd-delivery-strip">
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

          {/* CTA buttons */}
          <div className="pd-cta-row">
            <button
              className="pd-wishlist-btn"
              onClick={() => {
                wishlist.toggleItem(product);
                addToast(isWishlisted ? 'Removed from wishlist' : `Saved — ${product.name}`);
              }}
            >
              {isWishlisted ? '♥ Wishlisted' : '♡ Wishlist'}
            </button>
            <button
              className="pd-add-btn"
              onClick={() => { cart.addItem(product); addToast(`Added to bag — ${product.name}`); }}
            >
              Add to Bag
            </button>
            <Link className="pd-buy-now" to="/checkout">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
