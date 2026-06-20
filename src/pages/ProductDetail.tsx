import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { useToast } from '../context/ToastContext';
import { trackViewItem } from '../hooks/useAnalytics';
import { getProductReviews } from '../data/reviews';

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

function stockCount(id: string) {
  const n = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return (n % 7) + 2;
}

export default function ProductDetail({ cart, wishlist }: ProductDetailProps) {
  const { slug } = useParams();
  const { addToast } = useToast();
  const { products, loading } = useProducts();
  const imgRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  const product = products.find((item) => item.slug === slug);

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

    const reviews = getProductReviews(product.category, product.id);
    const reviewCount = 18 + (parseInt(product.id, 10) * 7) % 35; // deterministic per product: 18–52
    const priceValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: [product.image],
        description: product.description,
        sku: product.id,
        brand: { '@type': 'Brand', name: 'Nikskart' },
        category: product.category,
        url: `${base}/product/${product.slug}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: product.price,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          url: `${base}/product/${product.slug}`,
          priceValidUntil,
          seller: { '@type': 'Organization', name: 'Nikskart', url: base }
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          bestRating: 5,
          worstRating: 1,
          reviewCount
        },
        review: reviews.map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.author },
          datePublished: r.datePublished,
          reviewBody: r.reviewBody,
          reviewRating: { '@type': 'Rating', ratingValue: r.ratingValue, bestRating: 5, worstRating: 1 }
        }))
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: base },
          { '@type': 'ListItem', position: 2, name: product.category, item: `${base}/${catSlug}` },
          { '@type': 'ListItem', position: 3, name: product.name, item: `${base}/product/${product.slug}` }
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

    trackViewItem({ id: product.id, name: product.name, category: product.category, price: product.price });

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
            fetchPriority="high"
            decoding="sync"
            width="600"
            height="750"
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

          {/* Stock urgency */}
          <p className="pd-stock-urgency">Only {stockCount(product.id)} left in stock</p>

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

      {/* Related products */}
      {(() => {
        const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
        if (!related.length) return null;
        return (
          <section className="pd-related">
            <h2 className="pd-related-title">You may also like</h2>
            <div className="pd-related-grid">
              {related.map(p => (
                <a key={p.id} className="pd-related-card" onClick={() => navigate(`/product/${p.slug}`)}>
                  <img src={p.image} alt={`${p.name} – Buy ${p.category} online | Nikskart`} className="pd-related-img" loading="lazy" width="300" height="375" />
                  <div className="pd-related-info">
                    <p className="pd-related-name">{p.name}</p>
                    <p className="pd-related-price">₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        );
      })()}

      {/* Complete the Look — cross-category internal links */}
      {(() => {
        const crossCat = product.category === 'Artificial Jewellery'
          ? 'Sarees'
          : 'Artificial Jewellery';
        const crossLabel = product.category === 'Artificial Jewellery'
          ? 'Shop Sarees'
          : 'Complete the Look with Jewellery';
        const crossTo = crossCat === 'Sarees' ? '/sarees' : '/artificial-jewellery';
        const crossProducts = products.filter(p => p.category === crossCat).slice(0, 4);
        if (!crossProducts.length) return null;
        return (
          <section className="pd-related">
            <div className="pd-related-header">
              <h2 className="pd-related-title">{crossLabel}</h2>
              <Link to={crossTo} className="pd-related-see-all">See all →</Link>
            </div>
            <div className="pd-related-grid">
              {crossProducts.map(p => (
                <a key={p.id} className="pd-related-card" onClick={() => navigate(`/product/${p.slug}`)}>
                  <img src={p.image} alt={`${p.name} – ${p.category} | Nikskart`} className="pd-related-img" loading="lazy" width="300" height="375" decoding="async" />
                  <div className="pd-related-info">
                    <p className="pd-related-name">{p.name}</p>
                    <p className="pd-related-price">₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        );
      })()}

      {/* Sticky mobile CTA */}
      <div className="pd-sticky-cta">
        <span className="pd-sticky-price">₹{product.price.toLocaleString('en-IN')}</span>
        <button
          className="pd-sticky-add"
          onClick={() => { cart.addItem(product); addToast(`Added to bag — ${product.name}`); }}
        >
          Add to Bag
        </button>
      </div>
    </main>
  );
}
