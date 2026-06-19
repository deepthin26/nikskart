import { useSeoMeta } from '../hooks/useSeoMeta';

export default function About() {
  useSeoMeta(
    'About Us – Nikskart | India\'s Ethnic Fashion Store',
    'Learn about Nikskart — our story, mission and commitment to bringing authentic Indian ethnic wear to every woman.'
  );

  return (
    <main className="page-content static-page">
      <div className="static-hero">
        <span className="static-hero-label">Our Story</span>
        <h1>About Nikskart</h1>
        <p>Celebrating the timeless beauty of Indian ethnic fashion.</p>
      </div>

      <div className="static-body">
        <section className="static-section">
          <h2>Who We Are</h2>
          <p>Nikskart is an online ethnic fashion store dedicated to bringing the finest Indian traditional wear to women across the country. From the royal weaves of Banarasi silk to the delicate artistry of Kundan jewellery, we curate collections that honour India's rich craft heritage.</p>
          <p>Founded with a passion for authentic ethnic fashion, Nikskart bridges the gap between traditional artisans and modern women who love to dress in culture.</p>
        </section>

        <section className="static-section">
          <h2>Our Mission</h2>
          <p>To make premium ethnic fashion accessible, affordable and convenient — so every woman can celebrate her roots with confidence and grace.</p>
        </section>

        <section className="static-section">
          <h2>What We Offer</h2>
          <div className="about-pillars">
            <div className="about-pillar">
              <span className="about-pillar-icon">🥻</span>
              <h3>Sarees</h3>
              <p>Banarasi, Kanjivaram, Mysore Silk, Chiffon, Georgette — handpicked for quality and elegance.</p>
            </div>
            <div className="about-pillar">
              <span className="about-pillar-icon">👗</span>
              <h3>Kurtis</h3>
              <p>Handblock print, brocade, silk and cotton kurtis crafted for everyday comfort and festive occasions.</p>
            </div>
            <div className="about-pillar">
              <span className="about-pillar-icon">💎</span>
              <h3>Artificial Jewellery</h3>
              <p>Kundan, Polki, temple gold, lac bangles and oxidised silver — jewellery that completes every look.</p>
            </div>
          </div>
        </section>

        <section className="static-section">
          <h2>Our Promise</h2>
          <div className="about-promise-grid">
            <div className="about-promise-item">
              <strong>100% Authentic</strong>
              <p>Every product is carefully sourced and quality-checked before it reaches you.</p>
            </div>

            <div className="about-promise-item">
              <strong>Easy Returns</strong>
              <p>15-day hassle-free return policy — no questions asked.</p>
            </div>
            <div className="about-promise-item">
              <strong>Secure Payments</strong>
              <p>Pay safely via UPI, credit/debit cards or net banking, powered by Razorpay.</p>
            </div>
          </div>
        </section>

        <section className="static-section">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you. Call or WhatsApp us at <a href="tel:+918885700227" className="inline-link">+91 88857 00227</a> or visit our <a href="/contact" className="inline-link">Contact page</a>.</p>
        </section>
      </div>
    </main>
  );
}
