import { useEffect, useState } from 'react';

interface HeroProps {
  search: string;
  setSearch: (value: string) => void;
}

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1920&q=80',
    eyebrow: 'New Season · 2026 Collection',
    heading: 'Timeless festive fashion for every occasion',
    sub: 'Shop premium sarees, kurtis, lehengas and fine jewellery — curated exclusively for women.',
  },
  {
    image: 'https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&w=1920&q=80',
    eyebrow: 'Bridal & Wedding',
    heading: 'Dress your dream wedding in pure elegance',
    sub: 'Exclusive lehengas, bridal sarees and temple jewellery for your most special day.',
  },
  {
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1920&q=80',
    eyebrow: 'Fine Jewellery',
    heading: 'Handcrafted jewellery that tells your story',
    sub: 'Kundan, Polki and temple gold pieces crafted by master artisans.',
  },
];

export default function Hero({ search, setSearch }: HeroProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-banner home-hero">
      {slides.map((slide, i) => (
        <img
          key={i}
          className={`hero-bg-img${active === i ? ' hero-bg-img--active' : ''}`}
          src={slide.image}
          alt=""
          aria-hidden="true"
        />
      ))}
      <div className="hero-bg-overlay" />

      <div className="hero-copy">
        <span className="eyebrow">{slides[active].eyebrow}</span>
        <h1>{slides[active].heading}</h1>
        <p className="hero-text">{slides[active].sub}</p>
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
          <span className="highlight-pill">Free Delivery above ₹2999</span>
          <span className="highlight-pill">Easy Returns</span>
        </div>
      </div>

      {/* Slide dots */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${active === i ? ' active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
