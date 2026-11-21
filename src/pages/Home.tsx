import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSeoMeta } from '../hooks/useSeoMeta';
import { Product } from '../data/products';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { useToast } from '../context/ToastContext';
import { isStoreProduct } from '../data/categories';

interface HomeProps {
  cart: {
    addItem: (product: Product) => void;
  };
  wishlist: {
    toggleItem: (product: Product) => void;
    hasItem: (id: string) => boolean;
  };
}

const categoryMeta = [
  { title: 'Earrings',        cat: 'Earrings',        subtitle: 'Studs, hoops & danglers',         to: '/collections/earrings' },
  { title: 'Necklaces',       cat: 'Necklaces',       subtitle: 'Chains, chokers & layered',       to: '/collections/necklaces' },
  { title: 'Pendants',        cat: 'Pendants',        subtitle: 'Evil eye, initial & solitaire',   to: '/collections/pendants' },
  { title: 'Rings',           cat: 'Rings',           subtitle: 'Adjustable & statement',          to: '/collections/rings' },
  { title: 'Bracelets',       cat: 'Bracelets',       subtitle: 'Chain, cuff & charm',             to: '/collections/bracelets' },
  { title: "Women's Watches", cat: "Women's Watches", subtitle: 'Bracelet, mesh & leather',        to: '/collections/womens-watches' },
];



const whyUs = [
  { icon: '💧', title: 'Anti-Tarnish & Waterproof', desc: 'Shower-proof, sweat-proof, skin-safe pieces made to keep their shine every single day.' },
  { icon: '✨', title: 'Curated Collections', desc: 'Handpicked for quality, design and wearability. No fillers — only pieces we\'d wear ourselves.' },
  { icon: '↩', title: '15-Day Easy Returns', desc: 'Changed your mind? No worries. Hassle-free returns across India within 15 days of delivery.' },
  { icon: '🔒', title: 'Secure Payments', desc: 'Pay safely via UPI, Credit/Debit Card or Net Banking — powered by Razorpay with 100% encryption.' },
];

const testimonials = [
  { name: 'Priya R.', location: 'Chennai', rating: 5, text: 'My gold hoops still look brand new after weeks of daily wear — even in the shower. Delivery was quick and the packaging was lovely.', product: 'Gold Huggie Hoops' },
  { name: 'Meena S.', location: 'Mumbai', rating: 5, text: 'Loved my Kundan necklace set! The quality is amazing for the price. Wore it to my cousin\'s wedding and got so many compliments.', product: 'Kundan Necklace Set' },
  { name: 'Ananya K.', location: 'Hyderabad', rating: 5, text: 'My rose gold watch looks so premium and came beautifully boxed. I get compliments every time I wear it!', product: 'Rose Gold Mesh Watch' },
];

const faqs = [
  { q: 'How long does delivery take across India?', a: 'We deliver across India in 5–7 business days. You\'ll receive a tracking notification once your order is shipped.' },
  { q: 'What is the return policy?', a: 'We offer easy 15-day returns on all products. Items must be unused and in original packaging. Raise a return request from My Orders or WhatsApp us at +91 88857 00227.' },
  { q: 'Will the jewellery tarnish or turn green?', a: 'No — our anti-tarnish pieces are made with gold-plated stainless steel that is waterproof, sweat-proof and hypoallergenic, so they keep their shine with everyday wear.' },
  { q: 'Do you accept Cash on Delivery (COD)?', a: 'We currently accept UPI, Credit/Debit Cards and Net Banking via Razorpay. COD is not available at this time but we\'re working on it.' },
  { q: 'How do I track my order?', a: 'Once shipped, you\'ll receive a status update. You can also view live order status under My Orders after signing in to your Nikskart account.' },
  { q: 'How do I find my ring or bracelet size?', a: 'Most of our rings are adjustable. For other sizes, visit our Size Guide page or WhatsApp us for help choosing the right fit.' },
];

const filterTabs = ['All', 'Earrings', 'Necklaces', 'Pendants', 'Rings', 'Bracelets', "Women's Watches"];

export default function Home({ cart, wishlist }: HomeProps) {
  useSeoMeta(
    'Nikskart – Anti-Tarnish Jewellery & Watches Online',
    'Shop anti-tarnish, waterproof jewellery and watches at Nikskart — earrings, necklaces, rings, bracelets and watches. Easy 15-day returns.'
  );
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();
  const { products: allProducts } = useProducts();
  // storefront shows jewellery & watches only
  const products = useMemo(() => allProducts.filter(isStoreProduct), [allProducts]);
  const { addToast } = useToast();

  const categoryCards = useMemo(() =>
    categoryMeta.map((meta) => ({
      ...meta,
      image: products.find((p) => p.category === meta.cat)?.image ?? '',
    })),
    [products]
  );

  useEffect(() => {
    const cat = searchParams.get('category');
    setActiveTab(cat || 'All');
  }, [searchParams]);

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    const el = document.getElementById('faq-schema');
    if (el) el.remove();
    const s = document.createElement('script');
    s.id = 'faq-schema';
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
    return () => { document.getElementById('faq-schema')?.remove(); };
  }, []);

  const bestSellers = useMemo(() =>
    [...products].sort((a, b) => b.rating - a.rating).slice(0, 8),
    [products]
  );

  const filtered = useMemo(
    () =>
      products.filter((p: Product) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchTab = activeTab === 'All' || p.category === activeTab;
        return matchSearch && matchTab;
      }),
    [products, search, activeTab]
  );

  return (
    <main>
      <Hero search={search} setSearch={setSearch} />

      {/* Service strip */}
      <div className="promo-strip">
        <div className="promo-strip-item">
          <span className="promo-strip-icon">✦</span>
          <div>
            <strong>Anti-Tarnish</strong>
            <span>Waterproof &amp; sweat-proof</span>
          </div>
        </div>
        <div className="promo-strip-item">
          <span className="promo-strip-icon">♡</span>
          <div>
            <strong>Skin Safe</strong>
            <span>Hypoallergenic, nickel-free</span>
          </div>
        </div>
        <div className="promo-strip-item">
          <span className="promo-strip-icon">↩</span>
          <div>
            <strong>Easy Returns</strong>
            <span>15-day hassle-free returns</span>
          </div>
        </div>
        <div className="promo-strip-item">
          <span className="promo-strip-icon">🛡</span>
          <div>
            <strong>Secure Payments</strong>
            <span>UPI, cards & net banking</span>
          </div>
        </div>
      </div>



      {/* Category showcase */}
      <section className="section category-showcase">
        <div className="section-header">
          <div>
            <h2>Shop by Category</h2>
            <p>Jewellery &amp; watches for her</p>
          </div>
        </div>
        <div className="category-cards">
          {categoryCards.map((item) => (
            <article
              key={item.title}
              className="category-card"
              onClick={() => navigate(item.to)}
            >
              {item.image && (
                <img className="category-card-bg" src={item.image} alt={`Shop ${item.title} online – anti-tarnish jewellery & watches | Nikskart`} loading="lazy" decoding="async" width="600" height="400" />
              )}
              <div className="category-card-overlay" />
              <div className="category-card-content">
                <span className="category-chip">{item.title}</span>
                <h3>{item.subtitle}</h3>
                <button className="category-shop-btn">Shop now</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section bs-section">
        <div className="section-header">
          <div>
            <span className="bs-eyebrow">Top Rated</span>
            <h2>Best Sellers</h2>
            <p>Our most-loved pieces, rated by real customers</p>
          </div>
        </div>
        <div className="bs-strip">
          {bestSellers.map((product, i) => (
            <article
              key={product.id}
              className="bs-card"
              onClick={() => navigate(`/product/${product.slug}`)}
            >
              <div className="bs-rank">#{i + 1}</div>
              <div className="bs-img-wrap">
                <img src={product.image} alt={`${product.name} – ${product.category} | Nikskart`} loading="lazy" decoding="async" width="300" height="375" />
              </div>
              <div className="bs-info">
                <span className="bs-cat">{product.category}</span>
                <h3 className="bs-name">{product.name}</h3>
                <div className="bs-price-row">
                  <span className="bs-price">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.discount && <span className="bs-disc">{product.discount}</span>}
                </div>
                <div className="bs-rating">★ {product.rating}</div>
                <button
                  className="bs-add-btn"
                  onClick={(e) => { e.stopPropagation(); cart.addItem(product); addToast(`Added — ${product.name}`); }}
                >
                  Add to Bag
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Nikskart */}
      <section className="section why-section">
        <div className="section-header">
          <div>
            <h2>Why Shop with Nikskart</h2>
            <p>Anti-tarnish jewellery &amp; watches, delivered with care</p>
          </div>
        </div>
        <div className="why-grid">
          {whyUs.map((w) => (
            <div key={w.title} className="why-card">
              <span className="why-icon">{w.icon}</span>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="section-header">
          <div>
            <h2>What Our Customers Say</h2>
            <p>Real reviews from women across India</p>
          </div>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <article key={t.name} className="testimonial-card">
              <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-footer">
                <strong className="testimonial-name">{t.name}</strong>
                <span className="testimonial-meta">{t.location} · {t.product}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* All Products */}
      <section className="section featured">
        <div className="section-header">
          <div>
            <h2>All Products</h2>
            <p>Browse the full collection</p>
          </div>
          <span style={{ fontSize: '0.82rem', color: '#888' }}>{filtered.length} products</span>
        </div>
        <div className="category-list" style={{ marginBottom: '1.5rem' }}>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              className={`category-button${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <ProductGrid products={filtered} cart={cart} wishlist={wishlist} />
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div className="section-header">
          <div>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know before you shop</p>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span>{faq.q}</span>
                <span className="faq-chevron">{openFaq === i ? '▲' : '▼'}</span>
              </button>
              {openFaq === i && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
