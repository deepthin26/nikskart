import { useEffect, useState } from 'react';

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  city: string;
  state: string;
  locality: string;
  addressLine: string;
  landmark: string;
  addressType: string;
}

interface AuthState {
  name: string;
  email: string;
  authenticated: boolean;
  addresses: Address[];
  selectedAddressId: string | null;
}

const initialState: AuthState = {
  name: '',
  email: '',
  authenticated: false,
  addresses: [],
  selectedAddressId: null
};

export function useAuth() {
  const [user, setUser] = useState<AuthState>(initialState);

  useEffect(() => {
    const stored = localStorage.getItem('nikskart-user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nikskart-user', JSON.stringify(user));
  }, [user]);

  const login = (email: string, password: string) => {
    if (!email || !password) {
      return false;
    }
    const name = email.split('@')[0];
    setUser((current) => ({
      ...current,
      name,
      email,
      authenticated: true
    }));
    return true;
  };

  const logout = () => {
    setUser(initialState);
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}`;

    const newAddress: Address = { id: newId, ...address };
    setUser((current) => ({
      ...current,
      addresses: [...current.addresses, newAddress],
      selectedAddressId: newAddress.id
    }));
    return newId;
  };

  const selectAddress = (id: string) => {
    setUser((current) => ({
      ...current,
      selectedAddressId: id
    }));
  };

  const removeAddress = (id: string) => {
    setUser((current) => ({
      ...current,
      addresses: current.addresses.filter((address) => address.id !== id),
      selectedAddressId: current.selectedAddressId === id ? null : current.selectedAddressId
    }));
  };

  return { user, login, logout, addAddress, selectAddress, removeAddress };
}
