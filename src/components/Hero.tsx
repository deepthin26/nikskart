interface HeroProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function Hero({ search, setSearch }: HeroProps) {
  return (
    <section className="hero-banner home-hero">
      <div className="hero-copy">
        <p className="eyebrow">Discover Indian style</p>
        <h1>Timeless festive fashion for every occasion</h1>
        <p className="hero-text">
          Shop premium sarees, ethnic wear, handcrafted decor and curated collections crafted for modern Indian homes.
        </p>
        <div className="hero-search">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for sarees, kurtis, ethnic sets, decor..."
          />
        </div>
        <div className="hero-highlights">
          <div className="highlight-pill">Curated for you</div>
          <div className="highlight-pill">Festival ready</div>
          <div className="highlight-pill">Free delivery over ₹2999</div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card hero-card-large">
          <p className="badge">Premium Collection</p>
          <h2>Upto 65% off on ethnic wear</h2>
          <span>Elegant sarees, festive kurtis and handcrafted home accents.</span>
          <div className="hero-sale-stats">
            <div>
              <strong>1.5K+</strong>
              <span>Happy shoppers</span>
            </div>
            <div>
              <strong>75+</strong>
              <span>New arrivals daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
