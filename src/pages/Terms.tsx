import { useSeoMeta } from '../hooks/useSeoMeta';

export default function Terms() {
  useSeoMeta(
    'Terms of Use – Nikskart',
    'Nikskart terms of use — rules and conditions for using our website and placing orders.'
  );

  return (
    <main className="page-content static-page">
      <div className="static-hero">
        <span className="static-hero-label">Legal</span>
        <h1>Terms of Use</h1>
        <p>Last updated: June 2026</p>
      </div>

      <div className="static-body">
        <section className="static-section">
          <h2>Acceptance of Terms</h2>
          <p>By accessing or using nikskart.com, you agree to be bound by these Terms of Use. If you do not agree, please do not use our website.</p>
        </section>

        <section className="static-section">
          <h2>Use of the Website</h2>
          <ul className="policy-list">
            <li>You must be at least 18 years old to make a purchase.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree not to misuse the website, attempt to hack, scrape data or disrupt services.</li>
            <li>All content on this site (images, text, logos) is the property of Nikskart and may not be reproduced without permission.</li>
          </ul>
        </section>

        <section className="static-section">
          <h2>Products & Pricing</h2>
          <ul className="policy-list">
            <li>All prices are in Indian Rupees (₹) and inclusive of applicable taxes.</li>
            <li>We reserve the right to modify prices at any time without prior notice.</li>
            <li>Product images are for representation purposes. Slight colour variations may occur due to screen settings.</li>
            <li>We reserve the right to cancel orders in case of pricing errors or stock unavailability.</li>
          </ul>
        </section>

        <section className="static-section">
          <h2>Payments</h2>
          <p>All payments are processed securely through Razorpay. By placing an order, you confirm that the payment details provided are valid and authorised. Nikskart does not store any card or banking information.</p>
        </section>

        <section className="static-section">
          <h2>Shipping & Delivery</h2>
          <p>Delivery timelines are estimates and may vary. Nikskart is not responsible for delays caused by courier partners, weather conditions or circumstances beyond our control. Please refer to our <a href="/shipping-policy" className="inline-link">Shipping Policy</a> for details.</p>
        </section>

        <section className="static-section">
          <h2>Returns & Refunds</h2>
          <p>Please refer to our <a href="/returns" className="inline-link">Returns & Exchanges</a> page for the complete return and refund policy.</p>
        </section>

        <section className="static-section">
          <h2>Limitation of Liability</h2>
          <p>Nikskart shall not be liable for any indirect, incidental or consequential damages arising from your use of this website or products purchased. Our maximum liability is limited to the value of the order in question.</p>
        </section>

        <section className="static-section">
          <h2>Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Hyderabad, Telangana.</p>
        </section>

        <section className="static-section">
          <h2>Contact</h2>
          <p>For any questions about these terms, contact us at <a href="mailto:support@nikskart.com" className="inline-link">support@nikskart.com</a> or <a href="tel:+918885700227" className="inline-link">+91 88857 00227</a>.</p>
        </section>
      </div>
    </main>
  );
}
