import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="site-footer">
      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="footer-newsletter-inner">
          <div>
            <p className="footer-newsletter-label">Stay in the loop</p>
            <h3 className="footer-newsletter-heading">New collections. Exclusive offers. Delivered to you.</h3>
          </div>
          {subscribed ? (
            <p className="footer-newsletter-success">You're in! We'll send you our best offers.</p>
          ) : (
            <form className="footer-newsletter-form" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>

      {/* Main columns */}
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand-col">
          <div className="footer-brand">
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="42" height="42" rx="4" fill="#c9a46e"/>
              <rect x="1" y="1" width="42" height="42" rx="4" stroke="#0a0a0a" strokeWidth="1.5"/>
              <line x1="7" y1="7.5" x2="37" y2="7.5" stroke="#0a0a0a" strokeWidth="0.7" strokeOpacity="0.4"/>
              <line x1="7" y1="36.5" x2="37" y2="36.5" stroke="#0a0a0a" strokeWidth="0.7" strokeOpacity="0.4"/>
              <rect x="5.5" y="5.5" width="3" height="3" rx="0.5" fill="#0a0a0a" opacity="0.6" transform="rotate(45 7 7)"/>
              <rect x="34.5" y="5.5" width="3" height="3" rx="0.5" fill="#0a0a0a" opacity="0.6" transform="rotate(45 36 7)"/>
              <rect x="5.5" y="34.5" width="3" height="3" rx="0.5" fill="#0a0a0a" opacity="0.6" transform="rotate(45 7 36)"/>
              <rect x="34.5" y="34.5" width="3" height="3" rx="0.5" fill="#0a0a0a" opacity="0.6" transform="rotate(45 36 36)"/>
              <text x="22" y="29" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="700" fill="#0a0a0a" textAnchor="middle">N</text>
            </svg>
            <div className="brand-text">
              <strong>Nikskart</strong>
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a46e', fontWeight: 600 }}>Ethnic Fashion</span>
            </div>
          </div>
          <p className="footer-tagline">
            India's curated destination for women's ethnic wear and fine jewellery — sarees, kurtis, lehengas and handcrafted accessories.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Shop</h4>
          <ul className="footer-links">
            <li><Link to="/">New Arrivals</Link></li>
            <li><Link to="/sarees">Sarees</Link></li>
            <li><Link to="/kurtis">Kurtis</Link></li>
            <li><Link to="/artificial-jewellery">Artificial Jewellery</Link></li>
            <li><Link to="/">Festive Picks</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Customer Care</h4>
          <ul className="footer-links">
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/account">My Account</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/returns">Returns & Exchanges</Link></li>
            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
            <li><Link to="/size-guide">Size Guide</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Use</Link></li>
            <li><a href="tel:+918885700227">📞 +91 88857 00227</a></li>
            <li><a href="https://nikskart.com">nikskart.com</a></li>
          </ul>
        </div>
      </div>

      {/* Trust badges */}
      <div className="footer-trust">

        <div className="footer-trust-item">
          <span className="footer-trust-icon">↩</span>
          <span>15-day easy returns</span>
        </div>
        <div className="footer-trust-item">
          <span className="footer-trust-icon">🔒</span>
          <span>Secure payments</span>
        </div>
        <div className="footer-trust-item">
          <span className="footer-trust-icon">🛍</span>
          <span>100% authentic products</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copy">© {new Date().getFullYear()} Nikskart. All rights reserved.</p>
        <div className="footer-payment">
          <span className="footer-payment-label">We accept</span>
          <span className="footer-pay-chip">Visa</span>
          <span className="footer-pay-chip">Mastercard</span>
          <span className="footer-pay-chip">UPI</span>
          <span className="footer-pay-chip">Net Banking</span>
        </div>
        <div className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
