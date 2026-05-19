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

const categories = [
  { title: 'Sarees', subtitle: 'Silk, chiffon & festive prints' },
  { title: 'Kurtis', subtitle: 'Comfort meets ethnic style' }
];

const promoCollections = [
  {
    title: 'Saree Collection',
    description: 'Timeless sarees for festivals, weddings, and special occasions.',
    badge: 'Best seller'
  },
  {
    title: 'Kurti Range',
    description: 'Everyday kurtis with premium fabrics and elegant embroidery.',
    badge: 'New arrivals'
  },
  {
    title: 'Festive Ensembles',
    description: 'Complete ethnic looks for traditional celebrations.',
    badge: 'Trending'
  }
];

export default function Home({ cart, wishlist }: HomeProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'All' || product.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <main>
      <Hero search={search} setSearch={setSearch} />

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

      <section className="section category-showcase">
        <div className="section-header alt-header">
          <div>
            <h2>Shop by Category</h2>
            <p>Discover handpicked collections made for Indian wardrobes and homes.</p>
          </div>
          <p className="section-note">Traditional fabrics, modern designs.</p>
        </div>
        <div className="category-cards">
          {categories.map((item) => (
            <article key={item.title} className="category-card">
              <div>
                <span className="category-chip">{item.title}</span>
                <h3>{item.subtitle}</h3>
              </div>
              <button className="secondary-button">Shop now</button>
            </article>
          ))}
        </div>
      </section>

      <section className="section featured">
        <div className="section-header">
          <div>
            <h2>Featured Products</h2>
            <p>Latest arrivals, festive essentials and best-selling picks.</p>
          </div>
          <p>{filtered.length} products</p>
        </div>
        <ProductGrid products={filtered} cart={cart} wishlist={wishlist} />
      </section>
    </main>
  );
}
