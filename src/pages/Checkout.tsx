import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Product } from '../data/products';
import type { Address } from '../hooks/useAuth';

interface CheckoutProps {
  cart: {
    uniqueItems: (Product & { quantity: number })[];
    totalCount: number;
    totalPrice: number;
  };
  user: {
    name: string;
    email: string;
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
  }) => Promise<{
    id: string;
  }>;
}

const methods = ['Stripe', 'UPI', 'Net Banking', 'Cash on Delivery'];
const banks = ['State Bank', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra'];

export default function Checkout({ cart, user, addAddress, selectAddress, addOrder }: CheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);
  const [confirmed, setConfirmed] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
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
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState(banks[0]);

  const shippingCharge = cart.totalPrice >= 3000 ? 0 : 99;
  const grandTotal = cart.totalPrice + shippingCharge;

  const selectedAddress = useMemo(
    () => user.addresses.find((item) => item.id === user.selectedAddressId) || user.addresses[0] || null,
    [user.addresses, user.selectedAddressId]
  );

  const addressValid = selectedAddress !== null;
  const paymentValid = (() => {
    if (selectedMethod === 'Stripe') {
      return !!stripe && !!elements;
    }
    if (selectedMethod === 'UPI') {
      return upiId.trim().includes('@');
    }
    if (selectedMethod === 'Net Banking') {
      return bankName.trim().length > 0;
    }
    return selectedMethod === 'Cash on Delivery';
  })();

  const [orderId, setOrderId] = useState('');

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
    setContact({
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
  };

  const handlePlaceOrder = async () => {
    if (!addressValid) {
      setFormError('Select a delivery address or add a new one.');
      return;
    }
    if (!paymentValid) {
      setFormError('Enter valid payment details before placing your order.');
      return;
    }
    setFormError('');
    if (!selectedAddress) {
      return;
    }
    setSubmitting(true);

    try {
      if (selectedMethod === 'Stripe') {
        if (!stripe || !elements) {
          setFormError('Stripe is not ready. Please refresh the page.');
          setSubmitting(false);
          return;
        }

        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: Math.round(grandTotal * 100), currency: 'INR' })
        });

        const data = await response.json();
        if (!response.ok || !data.clientSecret) {
          setFormError(data.error || 'Unable to initialize payment.');
          setSubmitting(false);
          return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
          setFormError('Card input is not available.');
          setSubmitting(false);
          return;
        }

        const result = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card,
            billing_details: {
              email: user.email,
              name: selectedAddress.fullName || user.name
            }
          }
        });

        if (result.error) {
          setFormError(result.error.message || 'Payment failed.');
          setSubmitting(false);
          return;
        }

        if (result.paymentIntent?.status !== 'succeeded') {
          setFormError('Payment was not completed.');
          setSubmitting(false);
          return;
        }
      }

      const savedOrder = await addOrder({
        items: cart.uniqueItems,
        totalPrice: cart.totalPrice,
        shipping: shippingCharge,
        grandTotal,
        paymentMethod: selectedMethod,
        address: selectedAddress
      });
      setOrderId(savedOrder.id);
      setConfirmed(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user.authenticated) {
    return (
      <main className="page-content empty-cart">
        <h1>Please sign in to checkout</h1>
        <p>We need your account details to complete your order and secure payment.</p>
        <Link className="primary-button" to="/login">
          Sign in
        </Link>
      </main>
    );
  }

  if (cart.uniqueItems.length === 0) {
    return (
      <main className="page-content empty-cart">
        <h1>Your cart is empty</h1>
        <p>Add some great finds to your bag before checkout.</p>
        <Link className="primary-button" to="/">
          Shop now
        </Link>
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
          <p>Payment method: <strong>{selectedMethod}</strong></p>
          <p>Delivering to:</p>
          {selectedAddress && (
            <address className="confirmation-address">
              <strong>{selectedAddress.fullName}</strong>
              <br />{selectedAddress.addressLine}, {selectedAddress.locality}
              <br />{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
              <br />Phone: {selectedAddress.phone}
            </address>
          )}
          <p>We will send an order confirmation to <strong>{user.email}</strong>.</p>
          <Link className="primary-button" to="/">
            Continue Shopping
          </Link>
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
            <p>Delivering to <strong>{user.name}</strong> ({user.email})</p>
          </div>

          <div className="address-panel">
            <div className="panel-header">
              <h2>Shipping Address</h2>
              <button className="secondary-button" onClick={() => setIsAddingAddress((value) => !value)}>
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
                      <p>{address.phone} • {address.addressType}</p>
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
                        onChange={(event) => setContact((current) => ({
                          ...current,
                          [key]: event.target.value
                        }))}
                      />
                    </label>
                  ))}
                  <label>
                    Address Line
                    <textarea
                      rows={3}
                      value={contact.addressLine}
                      onChange={(event) => setContact((current) => ({
                        ...current,
                        addressLine: event.target.value
                      }))}
                    />
                  </label>
                  <label>
                    Landmark
                    <input
                      type="text"
                      value={contact.landmark}
                      onChange={(event) => setContact((current) => ({
                        ...current,
                        landmark: event.target.value
                      }))}
                    />
                  </label>
                  <label>
                    Address Type
                    <select
                      value={contact.addressType}
                      onChange={(event) => setContact((current) => ({
                        ...current,
                        addressType: event.target.value
                      }))}
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
            <h2>Payment Method</h2>
            <div className="payment-options">
              {methods.map((method) => (
                <label key={method} className={selectedMethod === method ? 'option selected' : 'option'}>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={selectedMethod === method}
                    onChange={() => setSelectedMethod(method)}
                  />
                  {method}
                </label>
              ))}
            </div>
            <div className="payment-details">
              {selectedMethod === 'Stripe' && (
                <div className="form-grid">
                  <label>
                    Card Details
                    <div className="stripe-card-element">
                      <CardElement options={{ hidePostalCode: true }} />
                    </div>
                  </label>
                </div>
              )}
              {selectedMethod === 'UPI' && (
                <label>
                  UPI ID
                  <input
                    type="text"
                    placeholder="example@bank"
                    value={upiId}
                    onChange={(event) => setUpiId(event.target.value)}
                  />
                </label>
              )}
              {selectedMethod === 'Net Banking' && (
                <label>
                  Select Bank
                  <select value={bankName} onChange={(event) => setBankName(event.target.value)}>
                    {banks.map((bank) => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </label>
              )}
              {selectedMethod === 'Cash on Delivery' && (
                <div className="cod-note">
                  Pay securely when your parcel arrives. COD orders are accepted on selected products.
                </div>
              )}
            </div>
          </div>

          {formError && <p className="form-error">{formError}</p>}
          <button className="primary-button checkout-action" onClick={handlePlaceOrder} type="button" disabled={submitting}>
            {submitting ? 'Placing order...' : 'Place Order'}
          </button>
        </section>
        <aside className="order-summary-card">
          <h2>Order Summary</h2>
          <div className="summary-list">
            {cart.uniqueItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x{item.quantity}</span>
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
          <p className="summary-note">Order will be processed using secure checkout and delivery tracking.</p>
        </aside>
      </div>
    </main>
  );
}
