import { useSeoMeta } from '../hooks/useSeoMeta';

export default function ShippingPolicy() {
  useSeoMeta(
    'Shipping Policy – Nikskart | Free Delivery above ₹2,999',
    'Nikskart shipping policy — free delivery on orders above ₹2,999, delivery timelines, pin code availability and more.'
  );

  return (
    <main className="page-content static-page">
      <div className="static-hero">
        <span className="static-hero-label">Delivery Info</span>
        <h1>Shipping Policy</h1>
        <p>Everything you need to know about how we deliver your order.</p>
      </div>

      <div className="static-body">
        <section className="static-section">
          <h2>Free Delivery</h2>
          <p>We offer <strong>free shipping on all orders above ₹2,999</strong> across India. For orders below ₹2,999, a flat shipping charge of ₹99 applies.</p>
        </section>

        <section className="static-section">
          <h2>Delivery Timeline</h2>
          <div className="policy-table">
            <div className="policy-row">
              <span>Metro cities (Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata)</span>
              <strong>3–5 business days</strong>
            </div>
            <div className="policy-row">
              <span>Tier-2 & Tier-3 cities</span>
              <strong>5–7 business days</strong>
            </div>
            <div className="policy-row">
              <span>Remote / rural areas</span>
              <strong>7–10 business days</strong>
            </div>
          </div>
          <p className="policy-note">Business days exclude Sundays and public holidays. Delivery timelines are estimates and may vary during sale seasons or festivals.</p>
        </section>

        <section className="static-section">
          <h2>Order Processing</h2>
          <p>Orders are processed within <strong>1–2 business days</strong> of payment confirmation. You will receive a shipping confirmation with a tracking number once your order is dispatched.</p>
        </section>

        <section className="static-section">
          <h2>Tracking Your Order</h2>
          <p>Once dispatched, track your order from the <a href="/orders" className="inline-link">My Orders</a> page. You can also contact us on WhatsApp at <a href="https://wa.me/918885700227" className="inline-link">+91 88857 00227</a> for real-time updates.</p>
        </section>

        <section className="static-section">
          <h2>Failed Delivery</h2>
          <p>If a delivery attempt fails, our courier partner will try again. After 2 failed attempts, the package is returned to us. Please ensure someone is available at the delivery address and the contact number is reachable.</p>
        </section>

        <section className="static-section">
          <h2>Questions?</h2>
          <p>Call or WhatsApp us at <a href="tel:+918885700227" className="inline-link">+91 88857 00227</a> or visit our <a href="/contact" className="inline-link">Contact page</a>.</p>
        </section>
      </div>
    </main>
  );
}
