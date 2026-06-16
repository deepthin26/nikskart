import { useSeoMeta } from '../hooks/useSeoMeta';

export default function PrivacyPolicy() {
  useSeoMeta(
    'Privacy Policy – Nikskart',
    'Nikskart privacy policy — how we collect, use and protect your personal information.'
  );

  return (
    <main className="page-content static-page">
      <div className="static-hero">
        <span className="static-hero-label">Legal</span>
        <h1>Privacy Policy</h1>
        <p>Last updated: June 2026</p>
      </div>

      <div className="static-body">
        <section className="static-section">
          <h2>Information We Collect</h2>
          <p>When you use Nikskart, we collect the following information:</p>
          <ul className="policy-list">
            <li><strong>Account information:</strong> Phone number and password when you register.</li>
            <li><strong>Order information:</strong> Name, delivery address, phone number and payment details for processing orders.</li>
            <li><strong>Usage data:</strong> Pages visited, products viewed and cart activity to improve your shopping experience.</li>
          </ul>
        </section>

        <section className="static-section">
          <h2>How We Use Your Information</h2>
          <ul className="policy-list">
            <li>To process and deliver your orders</li>
            <li>To send order confirmations and delivery updates</li>
            <li>To respond to your queries and provide customer support</li>
            <li>To improve our website and product offerings</li>
            <li>To send promotional offers (only if you opt in)</li>
          </ul>
        </section>

        <section className="static-section">
          <h2>Data Sharing</h2>
          <p>We do not sell your personal data. We share information only with:</p>
          <ul className="policy-list">
            <li><strong>Payment processors:</strong> Razorpay processes payments securely. We do not store card details.</li>
            <li><strong>Delivery partners:</strong> Your name, address and phone number are shared with our courier partners to fulfil orders.</li>
            <li><strong>Service providers:</strong> Supabase (database), Vercel (hosting) — all under strict data protection agreements.</li>
          </ul>
        </section>

        <section className="static-section">
          <h2>Cookies</h2>
          <p>We use cookies to keep you signed in and remember your cart. We do not use third-party tracking cookies for advertising. You can clear cookies at any time from your browser settings.</p>
        </section>

        <section className="static-section">
          <h2>Data Security</h2>
          <p>All data is transmitted over HTTPS with 256-bit SSL encryption. Passwords are hashed and never stored in plain text. Payment information is handled entirely by Razorpay — we never see or store your card details.</p>
        </section>

        <section className="static-section">
          <h2>Your Rights</h2>
          <ul className="policy-list">
            <li>Request a copy of the data we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your account and data</li>
            <li>Opt out of marketing communications at any time</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="tel:+918885700227" className="inline-link">+91 88857 00227</a>.</p>
        </section>

        <section className="static-section">
          <h2>Contact</h2>
          <p>For privacy-related queries, reach us at <a href="mailto:support@nikskart.com" className="inline-link">support@nikskart.com</a> or call <a href="tel:+918885700227" className="inline-link">+91 88857 00227</a>.</p>
        </section>
      </div>
    </main>
  );
}
