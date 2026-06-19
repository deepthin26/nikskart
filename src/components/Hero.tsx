import { useEffect, useState } from 'react';

const heroImages = [
  '/images/home-banner.webp',
  'https://images.unsplash.com/photo-1534600976687-5adbb1c0d034?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1614251055880-b72b89ff2db3?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80',
];

interface HeroProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function Hero({ search, setSearch }: HeroProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActive((p) => (p - 1 + heroImages.length) % heroImages.length);
  const next = () => setActive((p) => (p + 1) % heroImages.length);

  return (
    <section className="hero-banner home-hero">
      {heroImages.map((img, i) => (
        <div
          key={i}
          className={`hero-slide-bg${i === active ? ' active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="hero-bg-overlay" />

      <div className="hero-copy">
        <span className="eyebrow">New Season · 2026 Collection</span>
        <h1>Timeless festive fashion for every occasion</h1>
        <p className="hero-text">Shop premium sarees, kurtis, lehengas and fine jewellery — curated exclusively for women.</p>
        <div className="hero-search">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for sarees, kurtis, ethnic sets..."
          />
          <button className="hero-search-btn" type="button">Search</button>
        </div>
        <div className="hero-highlights">
          <span className="highlight-pill">Festival Ready</span>
          <span className="highlight-pill">Easy Returns</span>
        </div>
      </div>

      <button className="hero-arrow hero-prev" onClick={prev} aria-label="Previous slide">&#8249;</button>
      <button className="hero-arrow hero-next" onClick={next} aria-label="Next slide">&#8250;</button>

      <div className="hero-dots">
        {heroImages.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === active ? ' active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
