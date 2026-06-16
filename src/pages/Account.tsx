import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Address } from '../hooks/useAuth';
import { useSeoMeta } from '../hooks/useSeoMeta';

interface AccountProps {
  user: {
    authenticated: boolean;
    name: string;
    email: string;
    phone: string;
    addresses: Address[];
    selectedAddressId: string | null;
  };
  addAddress: (address: Omit<Address, 'id'>) => string;
  selectAddress: (id: string) => void;
  removeAddress: (id: string) => void;
}

const emptyAddress = {
  fullName: '',
  phone: '',
  pincode: '',
  city: '',
  state: '',
  locality: '',
  addressLine: '',
  landmark: '',
  addressType: 'Home'
};

export default function Account({ user, addAddress, selectAddress, removeAddress }: AccountProps) {
  useSeoMeta('My Account – Nikskart | Manage Your Profile & Addresses', 'Manage your Nikskart account — update addresses, view profile and track your ethnic wear orders.');
  const [isAdding, setIsAdding] = useState(false);
  const [formError, setFormError] = useState('');
  const [address, setAddress] = useState<Omit<Address, 'id'>>(emptyAddress);

  const defaultAddress = useMemo(
    () => user.addresses.find((item) => item.id === user.selectedAddressId) || user.addresses[0] || null,
    [user.addresses, user.selectedAddressId]
  );

  const handleSaveAddress = () => {
    const requiredFields = ['fullName', 'phone', 'pincode', 'city', 'state', 'addressLine'];
    for (const field of requiredFields) {
      if (!address[field as keyof typeof address].trim()) {
        setFormError('Please complete all required fields to save the address.');
        return;
      }
    }

    addAddress(address);
    setAddress(emptyAddress);
    setIsAdding(false);
    setFormError('');
  };

  if (!user.authenticated) {
    return (
      <main className="page-content empty-cart">
        <h1>Sign in to manage your account</h1>
        <p>Save addresses and view your profile details from My Account.</p>
        <Link className="primary-button" to="/login">
          Sign in
        </Link>
      </main>
    );
  }

  return (
    <main className="page-content account-page">
      <div className="account-grid">
        <section className="account-panel">
          <div className="section-title">
            <h1>My Account</h1>
            <p>Manage your personal profile and shipping addresses.</p>
          </div>

          <div className="account-card">
            <h2>Profile Details</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
          </div>

          <div className="address-panel">
            <div className="panel-header">
              <h2>Saved Addresses</h2>
              <button className="secondary-button" onClick={() => setIsAdding((current) => !current)}>
                {isAdding ? 'Cancel' : 'Add Address'}
              </button>
            </div>

            {user.addresses.length === 0 ? (
              <p className="empty-note">You don't have any saved addresses yet.</p>
            ) : (
              <div className="address-list">
                {user.addresses.map((item) => (
                  <div key={item.id} className={item.id === user.selectedAddressId ? 'address-card selected' : 'address-card'}>
                    <div className="address-card-header">
                      <label>
                        <input
                          type="radio"
                          name="account-address"
                          checked={item.id === user.selectedAddressId}
                          onChange={() => selectAddress(item.id)}
                        />
                        Default
                      </label>
                      <button className="text-button" onClick={() => removeAddress(item.id)}>
                        Remove
                      </button>
                    </div>
                    <p>
                      <strong>{item.fullName}</strong> • {item.addressType}
                    </p>
                    <p>{item.addressLine}</p>
                    <p>{item.locality}</p>
                    <p>
                      {item.city}, {item.state} - {item.pincode}
                    </p>
                    <p>Phone: {item.phone}</p>
                  </div>
                ))}
              </div>
            )}

            {isAdding && (
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
                        value={address[key as keyof typeof address]}
                        onChange={(event) =>
                          setAddress((current) => ({
                            ...current,
                            [key]: event.target.value
                          }))
                        }
                      />
                    </label>
                  ))}
                  <label>
                    Address Line
                    <textarea
                      rows={3}
                      value={address.addressLine}
                      onChange={(event) =>
                        setAddress((current) => ({
                          ...current,
                          addressLine: event.target.value
                        }))
                      }
                    />
                  </label>
                  <label>
                    Landmark
                    <input
                      type="text"
                      value={address.landmark}
                      onChange={(event) =>
                        setAddress((current) => ({
                          ...current,
                          landmark: event.target.value
                        }))
                      }
                    />
                  </label>
                  <label>
                    Address Type
                    <select
                      value={address.addressType}
                      onChange={(event) =>
                        setAddress((current) => ({
                          ...current,
                          addressType: event.target.value
                        }))
                      }
                    >
                      <option>Home</option>
                      <option>Work</option>
                      <option>Other</option>
                    </select>
                  </label>
                </div>
                {formError && <p className="form-error">{formError}</p>}
                <button className="primary-button" type="button" onClick={handleSaveAddress}>
                  Save Address
                </button>
              </div>
            )}
          </div>
        </section>

        <aside className="account-summary-card">
          <div className="summary-card">
            <h2>Account Summary</h2>
            <p>
              <strong>Default delivery address:</strong>
            </p>
            {defaultAddress ? (
              <p>
                {defaultAddress.fullName}, {defaultAddress.city}, {defaultAddress.state}
              </p>
            ) : (
              <p>No default address selected.</p>
            )}
            <p>
              <strong>Saved addresses:</strong> {user.addresses.length}
            </p>
            <p>Use this page to keep your shipping details up to date.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
