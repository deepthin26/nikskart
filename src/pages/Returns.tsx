import { useSeoMeta } from '../hooks/useSeoMeta';

export default function Returns() {
  useSeoMeta(
    'Returns & Exchanges – Nikskart | 15-Day Easy Returns',
    'Nikskart returns and exchange policy — 15-day hassle-free returns, how to initiate a return, and refund timelines.'
  );

  return (
    <main className="page-content static-page">
      <div className="static-hero">
        <span className="static-hero-label">Hassle-Free Returns</span>
        <h1>Returns & Exchanges</h1>
        <p>Not satisfied? We make it easy to return or exchange your order within 15 days.</p>
      </div>

      <div className="static-body">
        <section className="static-section">
          <h2>Return Window</h2>
          <p>You can return or exchange any eligible item within <strong>15 days</strong> of delivery. Items must be unused, unwashed and in their original packaging with tags intact.</p>
        </section>

        <section className="static-section">
          <h2>Non-Returnable Items</h2>
          <ul className="policy-list">
            <li>Items that have been worn, washed or altered</li>
            <li>Items without original tags or packaging</li>
            <li>Customised or made-to-order products</li>
            <li>Items marked as "Final Sale"</li>
          </ul>
        </section>

        <section className="static-section">
          <h2>How to Initiate a Return</h2>
          <div className="steps-list">
            <div className="step-item">
              <span className="step-number">1</span>
              <div>
                <strong>Contact Us</strong>
                <p>WhatsApp or call us at <a href="https://wa.me/918885700227" className="inline-link">+91 88857 00227</a> with your Order ID and reason for return.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">2</span>
              <div>
                <strong>Pack the Item</strong>
                <p>Securely pack the item in its original packaging with all tags and accessories.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">3</span>
              <div>
                <strong>Ship it Back</strong>
                <p>Our team will share the return address. Ship the item via any reliable courier.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">4</span>
              <div>
                <strong>Refund Processed</strong>
                <p>Once we receive and inspect the item, your refund is processed within 5–7 business days.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="static-section">
          <h2>Refund Methods</h2>
          <div className="policy-table">
            <div className="policy-row">
              <span>Original payment method (UPI / Card / Net Banking)</span>
              <strong>5–7 business days</strong>
            </div>
            <div className="policy-row">
              <span>Nikskart store credit</span>
              <strong>Within 24 hours</strong>
            </div>
          </div>
        </section>

        <section className="static-section">
          <h2>Damaged or Wrong Item?</h2>
          <p>If you received a damaged or incorrect item, contact us within <strong>48 hours</strong> of delivery with photos. We will arrange a free pickup and send a replacement or full refund immediately.</p>
        </section>

        <section className="static-section">
          <h2>Questions?</h2>
          <p>Call or WhatsApp us at <a href="tel:+918885700227" className="inline-link">+91 88857 00227</a> or visit our <a href="/contact" className="inline-link">Contact page</a>.</p>
        </section>
      </div>
    </main>
  );
}
