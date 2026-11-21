import { Link } from 'react-router-dom';
import { useSeoMeta } from '../hooks/useSeoMeta';
import BrandIcon, { BrandIconName } from '../components/BrandIcon';

const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const offers = [
  { title: 'Anti-Tarnish Jewellery', text: 'Earrings, necklaces, pendants, rings and bracelets in 18K gold-plated stainless steel.', img: px(9649265, 700), to: '/collections/anti-tarnish' },
  { title: "Women's Watches", text: 'Bracelet, mesh and leather-strap watches with clean, elegant dials.', img: px(179909, 700), to: '/collections/womens-watches' },
  { title: 'Kundan & Ethnic', text: 'Kundan, Polki and temple-gold styles for festivals and weddings.', img: px(17298688, 700), to: '/collections/artificial-jewellery' },
];

const promises = [
  { icon: 'drop' as BrandIconName, title: 'Waterproof', text: 'Shower-proof and sweat-proof — made for real, everyday life.' },
  { icon: 'sparkle' as BrandIconName, title: 'Anti-Tarnish', text: 'No fading, no turning green. Your pieces keep their shine.' },
  { icon: 'leaf' as BrandIconName, title: 'Skin-Safe', text: 'Hypoallergenic and nickel-free, gentle on sensitive skin.' },
  { icon: 'return' as BrandIconName, title: '15-Day Returns', text: 'Not in love? Easy, hassle-free returns across India.' },
  { icon: 'lock' as BrandIconName, title: 'Secure Payments', text: 'UPI, cards and net banking — protected by Razorpay.' },
  { icon: 'gift' as BrandIconName, title: 'Gift-Ready', text: 'Every order arrives beautifully packed, ready to gift.' },
];

export default function About() {
  useSeoMeta(
    'About Us – Nikskart | Anti-Tarnish Jewellery & Watches',
    'Learn about Nikskart — our story, mission and promise: anti-tarnish, waterproof jewellery and elegant watches for every woman.'
  );

  return (
    <main className="page-content ab-page">
      {/* Hero */}
      <section className="ab-hero" style={{ backgroundImage: `url(${px(6153885, 1600)})` }}>
        <div className="ab-hero-overlay" />
        <div className="ab-hero-inner">
          <span className="ab-eyebrow">Our Story</span>
          <h1>Made to shine, every single day</h1>
          <p>Nikskart creates anti-tarnish jewellery and elegant watches for women who want to look their best — without worrying about fading, tarnish or irritation.</p>
        </div>
      </section>

      {/* Story */}
      <section className="ab-story">
        <div className="ab-story-img" style={{ backgroundImage: `url(${px(27495830, 900)})` }} />
        <div className="ab-story-text">
          <span className="ab-eyebrow">Who We Are</span>
          <h2>Everyday luxury, without the worry</h2>
          <p>Nikskart is an online jewellery and watch store for women across India. We bring you demi-fine pieces — earrings, necklaces, pendants, rings, bracelets and watches — designed to be worn from morning coffee to evening plans.</p>
          <p>We started Nikskart because beautiful jewellery shouldn't fade, turn green or irritate your skin. Every piece is made to handle showers, workouts and long days, so you can wear it without a second thought.</p>
          <div className="ab-mission">
            <strong>Our mission</strong>
            <p>To make premium-looking, long-lasting jewellery and watches affordable for every woman — so you can shine every day, not just on special occasions.</p>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="ab-stats">
        <div><strong>18K</strong><span>Gold-plated finish</span></div>
        <div><strong>100%</strong><span>Waterproof &amp; skin-safe</span></div>
        <div><strong>15-Day</strong><span>Easy returns</span></div>
        <div><strong>Pan-India</strong><span>Delivery</span></div>
      </section>

      {/* What we offer */}
      <section className="ab-section">
        <div className="ab-head">
          <span className="ab-eyebrow">What We Offer</span>
          <h2>Pieces for every moment</h2>
        </div>
        <div className="ab-offers">
          {offers.map((o) => (
            <Link key={o.title} to={o.to} className="ab-offer">
              <div className="ab-offer-img" style={{ backgroundImage: `url(${o.img})` }} />
              <div className="ab-offer-body">
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <span className="ab-offer-link">Shop now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promise */}
      <section className="ab-section ab-promise-wrap">
        <div className="ab-head">
          <span className="ab-eyebrow">Our Promise</span>
          <h2>Why women choose Nikskart</h2>
        </div>
        <div className="ab-promises">
          {promises.map((p) => (
            <div key={p.title} className="ab-promise">
              <span className="ab-promise-icon"><BrandIcon name={p.icon} size={24} /></span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <h2>Find your next favourite piece</h2>
        <p>Questions? Call or WhatsApp us at <a href="tel:+918885700227">+91 88857 00227</a>.</p>
        <div className="ab-cta-btns">
          <Link to="/collections/best-sellers" className="ab-btn ab-btn-gold">Shop Best Sellers</Link>
          <Link to="/contact" className="ab-btn ab-btn-outline">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}
