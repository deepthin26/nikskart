import { useMemo, useState } from 'react';
import { products, Product } from '../data/products';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';

interface HomeProps {
  cart: {
    addItem: (product: Product) => void;
  };
  wishlist: {
    toggleItem: (product: Product) => void;
    hasItem: (id: string) => boolean;
  };
}

const categoryCards = [
  {
    title: 'Sarees',
    subtitle: 'Silk, chiffon & festive drapes',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Kurtis',
    subtitle: 'Comfort meets ethnic elegance',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Lehengas',
    subtitle: 'Bridal & festive collections',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Jewellery',
    subtitle: 'Kundan, Polki & temple gold',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
  },
];

const promoCollections = [
  {
    title: 'Saree Collection',
    description: 'Timeless sarees for festivals, weddings and special occasions.',
    badge: 'Best Seller',
  },
  {
    title: 'Kurti Range',
    description: 'Everyday kurtis with premium fabrics and elegant embroidery.',
    badge: 'New Arrivals',
  },
  {
    title: 'Fine Jewellery',
    description: 'Handcrafted Kundan, Polki and temple gold pieces for every occasion.',
    badge: 'Trending',
  },
];

const filterTabs = ['All', 'Sarees', 'Kurtis', 'Jewellery'];

export default function Home({ cart, wishlist }: HomeProps) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchTab = activeTab === 'All' || p.category === activeTab;
        return matchSearch && matchTab;
      }),
    [search, activeTab]
  );

  return (
    <main>
      <Hero search={search} setSearch={setSearch} />

      {/* Service strip */}
      <div className="promo-strip">
        <div className="promo-strip-item">
          <span className="promo-strip-icon">🚚</span>
          <div>
            <strong>Free Delivery</strong>
            <span>On orders above ₹2,999</span>
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

      {/* Collections */}
      <section className="section promo-banners">
        <div className="promo-grid">
          {promoCollections.map((promo) => (
            <article key={promo.title} className="promo-card">
              <span className="promo-chip">{promo.badge}</span>
              <h3>{promo.title}</h3>
              <p>{promo.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Category showcase */}
      <section className="section category-showcase">
        <div className="section-header">
          <div>
            <h2>Shop by Category</h2>
            <p>Women's wear & fine jewellery</p>
          </div>
        </div>
        <div className="category-cards">
          {categoryCards.map((item) => (
            <article
              key={item.title}
              className="category-card"
              onClick={() => setActiveTab(item.title === 'Lehengas' ? 'All' : item.title)}
            >
              <img className="category-card-bg" src={item.image} alt={item.title} loading="lazy" />
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

      {/* Featured products */}
      <section className="section featured">
        <div className="section-header">
          <div>
            <h2>Featured Products</h2>
            <p>Latest arrivals and best-selling picks</p>
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
    </main>
  );
}
