import { useEffect, useRef, useState } from 'react';

const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;

const getHeroImages = () => [
  `https://images.pexels.com/photos/13325931/pexels-photo-13325931.jpeg?auto=compress&cs=tinysrgb&w=${isMobile() ? 750 : 1200}`,
  `https://images.pexels.com/photos/13292666/pexels-photo-13292666.jpeg?auto=compress&cs=tinysrgb&w=${isMobile() ? 750 : 1200}`,
  `https://images.pexels.com/photos/20943477/pexels-photo-20943477.jpeg?auto=compress&cs=tinysrgb&w=${isMobile() ? 750 : 1200}`,
  `https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?auto=compress&cs=tinysrgb&w=${isMobile() ? 750 : 1200}`,
];

interface HeroProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function Hero({ search, setSearch }: HeroProps) {
  const [active, setActive] = useState(0);
  const heroImages = useRef(getHeroImages());
  const loaded = useRef<Set<number>>(new Set([0]));
  const [, forceUpdate] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const next = (active + 1) % heroImages.current.length;
    let changed = false;
    if (!loaded.current.has(active)) { loaded.current.add(active); changed = true; }
    if (!loaded.current.has(next))   { loaded.current.add(next);   changed = true; }
    if (changed) forceUpdate((n) => n + 1);
  }, [active]);

  useEffect(() => {
    const len = heroImages.current.length;
    const t = setInterval(() => setActive((p) => (p + 1) % len), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActive((p) => (p - 1 + heroImages.current.length) % heroImages.current.length);
  const next = () => setActive((p) => (p + 1) % heroImages.current.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;
    if (dx < 0) next(); else prev();
  };

  return (
    <section
      className="hero-banner home-hero"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {heroImages.current.map((img, i) => (
        <div
          key={i}
          className={`hero-slide-bg${i === active ? ' active' : ''}`}
          style={loaded.current.has(i) ? { backgroundImage: `url(${img})` } : undefined}
        />
      ))}
      <div className="hero-bg-overlay" />

      <div className="hero-copy">
        <span className="eyebrow">New Season · 2026 Collection</span>
        <h1>Jewellery &amp; watches that stay as bright as you</h1>
        <p className="hero-text">Anti-tarnish, waterproof demi-fine jewellery and statement watches — made for her, made for every day.</p>
        <div className="hero-search">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search earrings, chains, watches..."
          />
          <button className="hero-search-btn" type="button">Search</button>
        </div>
        <div className="hero-highlights">
          <span className="highlight-pill">Anti-Tarnish</span>
          <span className="highlight-pill">Easy Returns</span>
        </div>
      </div>

      <button className="hero-arrow hero-prev" onClick={prev} aria-label="Previous slide">&#8249;</button>
      <button className="hero-arrow hero-next" onClick={next} aria-label="Next slide">&#8250;</button>

      <div className="hero-dots">
        {heroImages.current.map((_, i) => (
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
