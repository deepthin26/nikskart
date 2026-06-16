import { useState } from 'react';
import { useSeoMeta } from '../hooks/useSeoMeta';

export default function Contact() {
  useSeoMeta(
    'Contact Us – Nikskart | Ethnic Fashion Store',
    'Get in touch with Nikskart for orders, returns or any queries. Call or WhatsApp us at +91 88857 00227.'
  );

  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi Nikskart!\n\nName: ${form.name}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.open(`https://wa.me/918885700227?text=${text}`, '_blank');
    setSent(true);
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <main className="page-content contact-page">
      {/* Hero */}
      <div className="contact-hero">
        <span className="contact-hero-label">We'd love to hear from you</span>
        <h1>Contact Us</h1>
        <p>Have a question about an order, a product, or anything else? We're here to help.</p>
      </div>

      <div className="contact-grid">
        {/* Left — cards */}
        <div className="contact-info">
          <div className="contact-card">
            <div className="contact-card-icon">📞</div>
            <div>
              <h3>Call Us</h3>
              <p>Monday – Saturday, 10 AM – 7 PM</p>
              <a className="contact-link" href="tel:+918885700227">+91 88857 00227</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">💬</div>
            <div>
              <h3>WhatsApp</h3>
              <p>Quick replies, order updates & support</p>
              <a
                className="contact-link whatsapp-link"
                href="https://wa.me/918885700227"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">📧</div>
            <div>
              <h3>Email</h3>
              <p>We respond within 24 hours</p>
              <a className="contact-link" href="mailto:support@nikskart.com">support@nikskart.com</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">🕐</div>
            <div>
              <h3>Business Hours</h3>
              <p>Monday – Friday: 10 AM – 7 PM</p>
              <p>Saturday: 10 AM – 5 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Right — enquiry form */}
        <div className="contact-form-panel">
          <h2>Send us a Message</h2>
          <p className="contact-form-sub">Fill in your details and we'll get back to you via WhatsApp.</p>

          {sent ? (
            <div className="contact-success">
              <span className="contact-success-icon">✓</span>
              <h3>Message sent!</h3>
              <p>We've opened WhatsApp for you. Expect a reply within a few hours.</p>
              <button className="primary-button" onClick={() => setSent(false)}>Send Another</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Your Name *
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </label>
              <label>
                Phone Number *
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </label>
              <label>
                Message *
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us how we can help you…"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />
              </label>
              <button className="primary-button" type="submit">
                Send via WhatsApp
              </button>
              <p className="contact-form-note">
                Clicking "Send via WhatsApp" will open WhatsApp with your message pre-filled.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
