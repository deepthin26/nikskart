import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSeoMeta } from '../hooks/useSeoMeta';
import { Product } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { useToast } from '../context/ToastContext';
import { trackAddToCart } from '../hooks/useAnalytics';

interface JewelleryCollectionProps {
  cart: { addItem: (p: Product) => void };
  wishlist: { toggleItem: (p: Product) => void; hasItem: (id: string) => boolean };
}

const collections = [
  {
    label: 'Bridal',
    title: 'Bridal Jewellery',
    subtitle: 'Kundan, Polki & Jadau for your big day',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80',
    tags: ['Kundan', 'Polki', 'Jadau Choker'],
  },
  {
    label: 'Temple',
    title: 'Temple Collection',
    subtitle: 'Authentic South Indian temple jewellery',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80',
    tags: ['Temple Gold', 'Deity Motifs', 'South Indian'],
  },
  {
    label: 'Everyday',
    title: 'Everyday Glam',
    subtitle: 'Oxidised jhumkas, lac bangles & more',
    image: 'https://images.unsplash.com/photo-1630018548696-e22d66d62cde?auto=format&fit=crop&w=500&q=80',
    tags: ['Oxidised Silver', 'Lac Bangles', 'Jhumkas'],
  },
];

const benefits = [
  { icon: '✦', title: '24K Gold Plating', desc: 'Premium gold-plated finish on all brass-base pieces — rich, lasting shine that mimics real gold.' },
  { icon: '✦', title: 'Lightweight Comfort', desc: 'Designed for all-day wear, from morning mandap to midnight celebrations without discomfort.' },
  { icon: '✦', title: '15-Day Returns', desc: 'Not happy? Return any jewellery piece within 15 days — no questions asked, full refund.' },
  { icon: '✦', title: 'Free Shipping', desc: 'Every order delivered free across India within 5–7 business days.' },
];

const reviews = [
  { name: 'Divya Nair', location: 'Kochi', rating: 5, product: 'Kundan Necklace Set', text: 'Beautifully crafted! The finish is premium and looks exactly like the photos. Wore it to a family function and everyone asked where I bought it. Great value.' },
  { name: 'Kavitha Iyer', location: 'Coimbatore', rating: 5, product: 'Jadau Choker', text: 'Bought this for my sister\'s engagement and it looked absolutely gorgeous with her lehenga. Fast delivery and excellent quality. Will order again.' },
  { name: 'Pooja Gupta', location: 'Jaipur', rating: 5, product: 'Polki Maang Tikka', text: 'The craftsmanship is superb — the stones look real and it\'s lightweight enough to wear for full-day events. Definitely buying more from Nikskart.' },
];

const faqs = [
  { q: 'Is the jewellery gold-plated or pure gold?', a: 'Our artificial jewellery is crafted from quality brass and copper alloys with premium 24K gold plating. They are not pure gold but offer an authentic, rich appearance at a fraction of the price.' },
  { q: 'How long does the gold plating last?', a: 'With proper care — keeping away from water, perfume and heavy sweat — the plating lasts 1–2 years or longer. Store in the pouch provided to prevent tarnishing.' },
  { q: 'Is the jewellery safe for sensitive skin?', a: 'Our jewellery uses nickel-free base metals and hypoallergenic plating. If you have very sensitive skin, we recommend wearing for shorter durations initially.' },
  { q: 'Can I get styling advice before I order?', a: 'Absolutely! WhatsApp us at +91 88857 00227 with your outfit or saree and we\'ll suggest the perfect jewellery pairing — completely free.' },
];

function Stars({ n }: { n: number }) {
  return <span className="jlp-stars">{[1,2,3,4,5].map(i => <span key={i} className={i <= n ? 'jlp-star filled' : 'jlp-star'}>★</span>)}</span>;
}

export default function JewelleryCollection({ cart, wishlist }: JewelleryCollectionProps) {
  useSeoMeta(
    'Artificial Jewellery Online – Kundan, Temple & Polki | Nikskart',
    'Shop handcrafted artificial jewellery at Nikskart — Kundan necklaces, temple gold earrings, Polki maang tikka, lac bangles and oxidised jhumkas. Free shipping, 15-day returns.'
  );

  const { products } = useProducts();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  const jewellery = products.filter((p) => p.category === 'Artificial Jewellery');

  // Schema injection
  useEffect(() => {
    const base = 'https://www.nikskart.com';
    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: base },
          { '@type': 'ListItem', position: 2, name: 'Artificial Jewellery', item: `${base}/jewellery-collection` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Artificial Jewellery Collection – Nikskart',
        description: 'Handcrafted Kundan, temple gold, Polki, lac and oxidised jewellery for Indian women.',
        numberOfItems: jewellery.length,
        itemListElement: jewellery.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: p.name,
            image: [p.image],
            url: `${base}/product/${p.slug}`,
            sku: p.id,
            brand: { '@type': 'Brand', name: 'Nikskart' },
            offers: { '@type': 'Offer', price: p.price, priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
          },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ];
    const existing = document.getElementById('jlp-schema');
    if (existing) existing.remove();
    const el = document.createElement('script');
    el.id = 'jlp-schema';
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
    return () => { document.getElementById('jlp-schema')?.remove(); };
  }, [jewellery]);

  return (
    <main className="jlp-page">

      {/* ── Hero ── */}
      <section className="jlp-hero">
        <div className="jlp-hero-overlay" />
        <div className="jlp-hero-content">
          <span className="jlp-hero-eyebrow">Handcrafted Artificial Jewellery</span>
          <h1 className="jlp-hero-title">Jewellery That Tells<br />Your Story</h1>
          <p className="jlp-hero-sub">Kundan, Temple Gold, Polki & Oxidised Silver — curated for Indian women who love authentic ethnic jewellery.</p>
          <div className="jlp-hero-badges">
            <span className="jlp-badge">Up to 35% Off</span>
            <span className="jlp-badge">Free Shipping</span>
            <span className="jlp-badge">15-Day Returns</span>
          </div>
          <div className="jlp-hero-ctas">
            <button
              className="jlp-cta-primary"
              onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Jewellery
            </button>
            <a
              className="jlp-cta-ghost"
              href="https://wa.me/918885700227?text=Hi%2C%20I%20need%20jewellery%20styling%20advice"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Styling Advice — Free
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div className="jlp-trust-strip">
        {[
          { icon: '✦', text: '24K Gold-Plated Finish' },
          { icon: '↩', text: '15-Day Hassle-Free Returns' },
          { icon: '🚚', text: 'Free Shipping Across India' },
          { icon: '🔒', text: 'Secure UPI & Card Payment' },
        ].map((t) => (
          <div key={t.text} className="jlp-trust-item">
            <span className="jlp-trust-icon">{t.icon}</span>
            <span>{t.text}</span>
          </div>
        ))}
      </div>

      {/* ── Collections ── */}
      <section className="jlp-section">
        <div className="jlp-section-header">
          <span className="jlp-eyebrow">Our Collections</span>
          <h2>Shop by Occasion</h2>
          <p>From bridal grandeur to everyday elegance — there's a piece for every moment.</p>
        </div>
        <div className="jlp-collections">
          {collections.map((c) => (
            <button
              key={c.label}
              className="jlp-coll-card"
              onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              aria-label={`View ${c.title}`}
            >
              <img src={c.image} alt={`${c.title} – Artificial Jewellery | Nikskart`} className="jlp-coll-img" loading="lazy" width="400" height="300" />
              <div className="jlp-coll-overlay">
                <h3 className="jlp-coll-title">{c.title}</h3>
                <p className="jlp-coll-sub">{c.subtitle}</p>
                <div className="jlp-coll-tags">
                  {c.tags.map((t) => <span key={t} className="jlp-coll-tag">{t}</span>)}
                </div>
                <span className="jlp-coll-cta">Shop Now →</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="jlp-section jlp-section-dark" ref={productsRef}>
        <div className="jlp-section-header jlp-section-header-light">
          <span className="jlp-eyebrow jlp-eyebrow-gold">Featured Pieces</span>
          <h2>Handpicked Jewellery</h2>
          <p>Every piece sourced from Indian artisans — authentic craft, premium finish.</p>
        </div>
        <div className="jlp-product-grid">
          {jewellery.map((p) => {
            const discountPct = parseInt(p.discount || '0') || 0;
            const mrp = discountPct > 0 ? Math.round(p.price / (1 - discountPct / 100)) : null;
            const isWishlisted = wishlist.hasItem(p.id);
            return (
              <div key={p.id} className="jlp-product-card">
                {p.badge && <span className="jlp-product-badge">{p.badge}</span>}
                <button
                  className={`jlp-product-wish${isWishlisted ? ' active' : ''}`}
                  onClick={() => {
                    wishlist.toggleItem(p);
                    addToast(isWishlisted ? 'Removed from wishlist' : `Saved — ${p.name}`);
                  }}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {isWishlisted ? '♥' : '♡'}
                </button>
                <div className="jlp-product-img-wrap" onClick={() => navigate(`/product/${p.slug}`)}>
                  <img
                    src={p.image}
                    alt={`${p.name} – Buy Artificial Jewellery Online | Nikskart`}
                    className="jlp-product-img"
                    loading="lazy"
                    width="300"
                    height="375"
                  />
                </div>
                <div className="jlp-product-info">
                  <p className="jlp-product-name" onClick={() => navigate(`/product/${p.slug}`)}>{p.name}</p>
                  <div className="jlp-product-price-row">
                    <span className="jlp-product-price">₹{p.price.toLocaleString('en-IN')}</span>
                    {mrp && <span className="jlp-product-mrp">₹{mrp.toLocaleString('en-IN')}</span>}
                    {p.discount && <span className="jlp-product-disc">{p.discount}</span>}
                  </div>
                  <button
                    className="jlp-product-add"
                    onClick={() => {
                      cart.addItem(p);
                      trackAddToCart(p.name, p.price);
                      addToast(`Added to bag — ${p.name}`);
                    }}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="jlp-see-all-wrap">
          <Link to="/artificial-jewellery" className="jlp-see-all">View All Jewellery →</Link>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="jlp-section">
        <div className="jlp-section-header">
          <span className="jlp-eyebrow">Why Nikskart</span>
          <h2>Crafted with Care</h2>
        </div>
        <div className="jlp-benefits">
          {benefits.map((b) => (
            <div key={b.title} className="jlp-benefit-card">
              <span className="jlp-benefit-icon">{b.icon}</span>
              <h3 className="jlp-benefit-title">{b.title}</h3>
              <p className="jlp-benefit-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="jlp-section jlp-section-cream">
        <div className="jlp-section-header">
          <span className="jlp-eyebrow">Customer Love</span>
          <h2>What Our Customers Say</h2>
        </div>
        <div className="jlp-reviews">
          {reviews.map((r) => (
            <div key={r.name} className="jlp-review-card">
              <Stars n={r.rating} />
              <p className="jlp-review-text">"{r.text}"</p>
              <div className="jlp-review-meta">
                <strong>{r.name}</strong>
                <span>{r.location} · {r.product}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="jlp-section">
        <div className="jlp-section-header">
          <span className="jlp-eyebrow">Questions?</span>
          <h2>Jewellery FAQs</h2>
        </div>
        <div className="jlp-faq">
          {faqs.map((f, i) => (
            <div key={i} className={`jlp-faq-item${openFaq === i ? ' open' : ''}`}>
              <button className="jlp-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q}
                <span className="jlp-faq-chevron">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && <p className="jlp-faq-a">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ── WhatsApp CTA Banner ── */}
      <section className="jlp-wa-banner">
        <div className="jlp-wa-inner">
          <div className="jlp-wa-text">
            <h2>Not Sure What to Choose?</h2>
            <p>WhatsApp us your outfit or occasion — we'll suggest the perfect jewellery for free.</p>
          </div>
          <a
            className="jlp-wa-btn"
            href="https://wa.me/918885700227?text=Hi%2C%20I%20need%20jewellery%20styling%20advice%20for%20my%20outfit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

    </main>
  );
}
