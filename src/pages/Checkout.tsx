import { useEffect, useMemo, useState } from 'react';
import { useSeoMeta } from '../hooks/useSeoMeta';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import type { Address } from '../hooks/useAuth';
import { apiUrl } from '../lib/api';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
}

interface RazorpayInstance {
  open(): void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface CheckoutProps {
  cart: {
    uniqueItems: (Product & { quantity: number })[];
    totalCount: number;
    totalPrice: number;
  };
  user: {
    name: string;
    email: string;
    phone: string;
    authenticated: boolean;
    addresses: Address[];
    selectedAddressId: string | null;
  };
  addAddress: (address: Omit<Address, 'id'>) => string;
  selectAddress: (id: string) => void;
  addOrder: (order: {
    items: (Product & { quantity: number })[];
    totalPrice: number;
    shipping: number;
    grandTotal: number;
    paymentMethod: string;
    address: Address;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) => Promise<{ id: string }>;
  clearCart: () => void;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function getBackendErrorMessage(error: unknown) {
  return error instanceof Error ? `Error: ${error.message}` : 'Unable to place order. Please try again.';
}

export default function Checkout({ cart, user, addAddress, selectAddress, addOrder, clearCart }: CheckoutProps) {
  useSeoMeta('Secure Checkout – Nikskart | Pay Safely Online', 'Complete your Nikskart order securely. Pay via UPI, Credit/Debit Card or Net Banking. Free delivery above ₹2999.');
  const [confirmed, setConfirmed] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [contact, setContact] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    city: '',
    state: '',
    locality: '',
    addressLine: '',
    landmark: '',
    addressType: 'Home'
  });

  // Wake up the backend as soon as checkout page opens
  useEffect(() => {
    fetch(apiUrl('/')).catch(() => {});
  }, []);

  const shippingCharge = cart.totalPrice >= 3000 ? 0 : 99;
  const grandTotal = cart.totalPrice + shippingCharge;

  const selectedAddress = useMemo(
    () => user.addresses.find((item) => item.id === user.selectedAddressId) || user.addresses[0] || null,
    [user.addresses, user.selectedAddressId]
  );

  const handleAddAddress = () => {
    const requiredFields = ['fullName', 'phone', 'pincode', 'city', 'state', 'addressLine'];
    for (const field of requiredFields) {
      if (!contact[field as keyof typeof contact].trim()) {
        setFormError('Please fill in all required address fields.');
        return;
      }
    }
    addAddress({
      fullName: contact.fullName.trim(),
      phone: contact.phone.trim(),
      pincode: contact.pincode.trim(),
      city: contact.city.trim(),
      state: contact.state.trim(),
      locality: contact.locality.trim(),
      addressLine: contact.addressLine.trim(),
      landmark: contact.landmark.trim(),
      addressType: contact.addressType
    });
    setFormError('');
    setIsAddingAddress(false);
    setContact({ fullName: '', phone: '', pincode: '', city: '', state: '', locality: '', addressLine: '', landmark: '', addressType: 'Home' });
  };

  const handlePayWithRazorpay = async () => {
    if (!selectedAddress) {
      setFormError('Select a delivery address or add a new one.');
      return;
    }
    setFormError('');
    setSubmitting(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setFormError('Failed to load Razorpay. Check your internet connection.');
        setSubmitting(false);
        return;
      }

      const orderRes = await fetch(apiUrl('/api/create-razorpay-order'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: grandTotal })
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.id) {
        setFormError(orderData.error || 'Unable to initialize payment.');
        setSubmitting(false);
        return;
      }

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID as string;

      const rzp = new window.Razorpay({
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Nikskart',
        description: `Order – ${cart.uniqueItems.length} item(s)`,
        order_id: orderData.id,
        prefill: {
          name: selectedAddress.fullName || user.name,
          email: user.email,
          contact: selectedAddress.phone
        },
        theme: { color: '#c9a46e' },
        handler: async (response: RazorpayResponse) => {
          try {
            const saved = await addOrder({
              items: cart.uniqueItems,
              totalPrice: cart.totalPrice,
              shipping: shippingCharge,
              grandTotal,
              paymentMethod: 'Razorpay',
              address: selectedAddress,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });
            clearCart();
            setOrderId(saved.id);
            setConfirmed(true);
          } catch (err) {
            setFormError(getBackendErrorMessage(err));
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
          }
        }
      });

      rzp.open();
    } catch (error) {
      setFormError(getBackendErrorMessage(error));
      setSubmitting(false);
    }
  };

  if (!user.authenticated) {
    return (
      <main className="page-content empty-cart">
        <h1>Please sign in to checkout</h1>
        <p>We need your account details to complete your order and secure payment.</p>
        <Link className="primary-button" to="/login">Sign in</Link>
      </main>
    );
  }

  if (cart.uniqueItems.length === 0) {
    return (
      <main className="page-content empty-cart">
        <h1>Your cart is empty</h1>
        <p>Add some great finds to your bag before checkout.</p>
        <Link className="primary-button" to="/">Shop now</Link>
      </main>
    );
  }

  if (confirmed) {
    return (
      <main className="page-content checkout-page">
        <div className="order-confirmation">
          <h1>Order Confirmed!</h1>
          <p>Hi {user.name}, your order has been placed successfully.</p>
          <p>Order ID: <strong>{orderId}</strong></p>
          <p>Payment: <strong>Razorpay</strong></p>
          <p>Delivering to:</p>
          {selectedAddress && (
            <address className="confirmation-address">
              <strong>{selectedAddress.fullName}</strong>
              <br />{selectedAddress.addressLine}, {selectedAddress.locality}
              <br />{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
              <br />Phone: {selectedAddress.phone}
            </address>
          )}
          <p>Phone: <strong>{user.phone}</strong></p>
          <Link className="primary-button" to="/">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content checkout-page">
      <div className="checkout-grid">
        <section className="checkout-form">
          <div className="section-title">
            <h1>Secure Checkout</h1>
            <p>Delivering to <strong>{user.name}</strong> ({user.phone})</p>
          </div>

          <div className="address-panel">
            <div className="panel-header">
              <h2>Shipping Address</h2>
              <button className="secondary-button" onClick={() => setIsAddingAddress((v) => !v)}>
                {isAddingAddress ? 'Cancel' : 'Add New Address'}
              </button>
            </div>
            {user.addresses.length > 0 ? (
              <div className="address-list">
                {user.addresses.map((address) => (
                  <label key={address.id} className={selectedAddress?.id === address.id ? 'address-card selected' : 'address-card'}>
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress?.id === address.id}
                      onChange={() => selectAddress(address.id)}
                    />
                    <div>
                      <strong>{address.fullName}</strong>
                      <p>{address.addressLine}, {address.locality}</p>
                      <p>{address.city}, {address.state} - {address.pincode}</p>
                      <p>{address.phone} · {address.addressType}</p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="empty-note">No addresses saved yet. Add one to continue.</p>
            )}
            {isAddingAddress && (
              <div className="address-form">
                <div className="form-grid">
                  {[
                    { label: 'Full Name', key: 'fullName', type: 'text' },
                    { label: 'Phone', key: 'phone', type: 'tel' },
                    { label: 'Pincode', key: 'pincode', type: 'text' },
                    { label: 'City', key: 'city', type: 'text' },
                    { label: 'State', key: 'state', type: 'text' },
                    { label: 'Locality', key: 'locality', type: 'text' }
                  ].map(({ label, key, type }) => (
                    <label key={key}>
                      {label}
                      <input
                        type={type}
                        value={contact[key as keyof typeof contact]}
                        onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))}
                      />
                    </label>
                  ))}
                  <label>
                    Address Line
                    <textarea
                      rows={3}
                      value={contact.addressLine}
                      onChange={(e) => setContact((c) => ({ ...c, addressLine: e.target.value }))}
                    />
                  </label>
                  <label>
                    Landmark
                    <input
                      type="text"
                      value={contact.landmark}
                      onChange={(e) => setContact((c) => ({ ...c, landmark: e.target.value }))}
                    />
                  </label>
                  <label>
                    Address Type
                    <select
                      value={contact.addressType}
                      onChange={(e) => setContact((c) => ({ ...c, addressType: e.target.value }))}
                    >
                      <option>Home</option>
                      <option>Work</option>
                      <option>Other</option>
                    </select>
                  </label>
                </div>
                <button className="primary-button" onClick={handleAddAddress} type="button">
                  Save Address
                </button>
              </div>
            )}
          </div>

          <div className="payment-panel">
            <h2>Payment</h2>
            <div className="payment-methods">
              {([
                { id: 'upi', label: 'UPI', sub: 'GPay, PhonePe, Paytm', icon: '📲' },
                { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay', icon: '💳' },
                { id: 'netbanking', label: 'Net Banking', sub: 'All major banks', icon: '🏦' },
              ] as const).map((m) => (
                <label
                  key={m.id}
                  className={`payment-method-card${paymentMethod === m.id ? ' selected' : ''}`}
                  onClick={() => setPaymentMethod(m.id)}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m.id}
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                  />
                  <span className="pm-icon">{m.icon}</span>
                  <div>
                    <strong>{m.label}</strong>
                    <span className="pm-sub">{m.sub}</span>
                  </div>
                </label>
              ))}
            </div>
            <p style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '0.75rem' }}>
              🔒 Secured by Razorpay · 256-bit SSL encryption
            </p>
          </div>

          {formError && <p className="form-error">{formError}</p>}
          <button
            className="primary-button checkout-action"
            onClick={handlePayWithRazorpay}
            type="button"
            disabled={submitting || !selectedAddress}
          >
            {submitting
              ? 'Processing...'
              : `Pay ₹${grandTotal} via ${paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Card' : 'Net Banking'}`}
          </button>
        </section>

        <aside className="order-summary-card">
          <h2>Order Summary</h2>
          <div className="summary-list">
            {cart.uniqueItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.name} ×{item.quantity}</span>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}
          </div>
          <div className="summary-line">
            <span>Subtotal</span>
            <strong>₹{cart.totalPrice}</strong>
          </div>
          <div className="summary-line">
            <span>Shipping</span>
            <strong>{shippingCharge === 0 ? 'Free' : `₹${shippingCharge}`}</strong>
          </div>
          <div className="summary-total">
            <span>Grand Total</span>
            <strong>₹{grandTotal}</strong>
          </div>
          <p className="summary-note">Secured by Razorpay · 256-bit SSL encryption</p>
        </aside>
      </div>
    </main>
  );
}
