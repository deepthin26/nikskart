import { Link } from 'react-router-dom';
import { useSeoMeta } from '../hooks/useSeoMeta';

export default function About() {
  useSeoMeta(
    'About Us – Nikskart | Anti-Tarnish Jewellery & Watches',
    'Learn about Nikskart — our story, mission and promise: anti-tarnish, waterproof jewellery and elegant watches for every woman.'
  );

  return (
    <main className="page-content static-page">
      <div className="static-hero">
        <span className="static-hero-label">Our Story</span>
        <h1>About Nikskart</h1>
        <p>Everyday jewellery and watches that keep their shine — just like you.</p>
      </div>

      <div className="static-body">
        <section className="static-section">
          <h2>Who We Are</h2>
          <p>Nikskart is an online jewellery and watch store for women across India. We bring you demi-fine, anti-tarnish pieces — earrings, necklaces, pendants, rings, bracelets and elegant watches — designed to be worn every single day.</p>
          <p>We started Nikskart because beautiful jewellery shouldn't fade, turn green or irritate your skin. Our pieces are made to handle showers, workouts and long days, so you can wear them from morning coffee to evening plans without a second thought.</p>
        </section>

        <section className="static-section">
          <h2>Our Mission</h2>
          <p>To make premium-looking, long-lasting jewellery and watches affordable for every woman — so you can shine every day, not just on special occasions.</p>
        </section>

        <section className="static-section">
          <h2>What We Offer</h2>
          <div className="about-pillars">
            <div className="about-pillar">
              <span className="about-pillar-icon">💎</span>
              <h3>Anti-Tarnish Jewellery</h3>
              <p>Earrings, necklaces, pendants, rings, bracelets and anklets in 18K gold-plated stainless steel — waterproof and sweat-proof.</p>
            </div>
            <div className="about-pillar">
              <span className="about-pillar-icon">⌚</span>
              <h3>Women's Watches</h3>
              <p>Bracelet, mesh and leather-strap watches with clean dials — elegant enough for work, evenings and gifting.</p>
            </div>
            <div className="about-pillar">
              <span className="about-pillar-icon">✨</span>
              <h3>Kundan &amp; Ethnic</h3>
              <p>Kundan, Polki and temple-gold styles for festivals and weddings, when you want a traditional touch.</p>
            </div>
          </div>
        </section>

        <section className="static-section">
          <h2>Our Promise</h2>
          <div className="about-promise-grid">
            <div className="about-promise-item">
              <strong>Skin-Safe &amp; Anti-Tarnish</strong>
              <p>Hypoallergenic, nickel-free pieces that keep their shine — quality-checked before they reach you.</p>
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
          <p>We'd love to hear from you. Call or WhatsApp us at <a href="tel:+918885700227" className="inline-link">+91 88857 00227</a> or visit our <Link to="/contact" className="inline-link">Contact page</Link>.</p>
        </section>
      </div>
    </main>
  );
}
