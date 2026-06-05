import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="footer-newsletter-inner">
          <div>
            <p className="footer-newsletter-label">Stay in the loop</p>
            <h3 className="footer-newsletter-heading">New collections. Exclusive offers. Delivered to you.</h3>
          </div>
          <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Main columns */}
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand-col">
          <div className="footer-brand">
            <span className="footer-brand-icon">N</span>
            <strong>Nikskart</strong>
          </div>
          <p className="footer-tagline">
            India's curated destination for women's ethnic wear and fine jewellery — sarees, kurtis, lehengas and handcrafted accessories.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram" className="footer-social-link">IG</a>
            <a href="#" aria-label="Facebook" className="footer-social-link">FB</a>
            <a href="#" aria-label="Pinterest" className="footer-social-link">PT</a>
            <a href="#" aria-label="YouTube" className="footer-social-link">YT</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Shop</h4>
          <ul className="footer-links">
            <li><Link to="/">New Arrivals</Link></li>
            <li><Link to="/">Sarees</Link></li>
            <li><Link to="/">Kurtis</Link></li>
            <li><Link to="/">Lehengas</Link></li>
            <li><Link to="/">Jewellery</Link></li>
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
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Size Guide</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Company</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Artisans</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Store Locator</a></li>
          </ul>
        </div>
      </div>

      {/* Trust badges */}
      <div className="footer-trust">
        <div className="footer-trust-item">
          <span className="footer-trust-icon">🚚</span>
          <span>Free delivery above ₹2,999</span>
        </div>
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
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
