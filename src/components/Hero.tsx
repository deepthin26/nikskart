interface HeroProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function Hero({ search, setSearch }: HeroProps) {
  return (
    <section className="hero-banner home-hero" style={{ backgroundImage: 'url(/images/home-banner.webp)', backgroundSize: 'cover' }}>
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
          <span className="highlight-pill">Free Delivery above ₹2999</span>
          <span className="highlight-pill">Easy Returns</span>
        </div>
      </div>
    </section>
  );
}
