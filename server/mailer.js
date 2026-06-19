import nodemailer from 'nodemailer';

const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_PASS;

const transporter = gmailUser && gmailPass
  ? nodemailer.createTransport({ service: 'gmail', auth: { user: gmailUser, pass: gmailPass } })
  : null;

const STATUS_INFO = {
  Processing:         { emoji: '⏳', line: 'Your order is being processed and will be shipped soon.' },
  Shipped:            { emoji: '🚚', line: 'Great news — your order has been shipped and is on its way!' },
  'Out for Delivery': { emoji: '📦', line: 'Your order is out for delivery today. Keep an eye out!' },
  Delivered:          { emoji: '✅', line: 'Your order has been delivered. Thank you for shopping with Nikskart!' },
  Cancelled:          { emoji: '❌', line: 'Your order has been cancelled. Contact us if you have questions.' },
};

export async function sendStatusEmail({ toEmail, toName, orderId, status, items, grandTotal }) {
  if (!transporter) {
    console.log(`[mailer] GMAIL_USER/GMAIL_PASS not set — skipping notification for order ${orderId} → ${status}`);
    return;
  }

  const info = STATUS_INFO[status] || { emoji: '📋', line: `Your order status is now: ${status}.` };
  const itemList = (items || []).map((i) => `${i.name} ×${i.quantity}`).join(', ');
  const year = new Date().getFullYear();

  const html = `
<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a;background:#fff;">
  <div style="background:#0a0a0a;padding:22px 32px;text-align:center;">
    <span style="color:#c9a46e;font-size:22px;font-weight:700;letter-spacing:.05em;">Nikskart</span>
    <p style="color:#888;font-size:11px;margin:4px 0 0;letter-spacing:.15em;text-transform:uppercase;">Ethnic Fashion</p>
  </div>
  <div style="padding:32px;">
    <p style="font-size:15px;margin:0 0 8px;">Hi <strong>${toName}</strong>,</p>
    <p style="font-size:24px;font-weight:700;margin:0 0 6px;">${info.emoji} Order ${status}</p>
    <p style="font-size:15px;color:#555;margin:0 0 24px;">${info.line}</p>
    <div style="background:#fdf8f2;border-left:3px solid #c9a46e;padding:16px 20px;border-radius:4px;margin-bottom:24px;">
      <p style="margin:0 0 6px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:.06em;">Order Details</p>
      <p style="margin:0 0 5px;font-size:14px;"><strong>Order ID:</strong> ${orderId}</p>
      <p style="margin:0 0 5px;font-size:14px;"><strong>Items:</strong> ${itemList}</p>
      <p style="margin:0;font-size:14px;"><strong>Total:</strong> ₹${grandTotal}</p>
    </div>
    <p style="font-size:13px;color:#888;">Track all your orders at
      <a href="https://nikskart.com/orders" style="color:#c9a46e;text-decoration:none;">nikskart.com/orders</a>.
    </p>
    <p style="margin-top:28px;font-size:13px;color:#aaa;">Thank you for shopping with Nikskart 🙏</p>
  </div>
  <div style="background:#f5f5f5;padding:14px 32px;text-align:center;font-size:11px;color:#bbb;">
    © ${year} Nikskart. All rights reserved.
  </div>
</div>`;

  await transporter.sendMail({
    from: `"Nikskart" <${gmailUser}>`,
    to: toEmail,
    subject: `${info.emoji} Your Nikskart Order — ${status}`,
    html,
  });

  console.log(`[mailer] Notification sent to ${toEmail} — order ${orderId} → ${status}`);
}
