import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

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

interface UserState {
  authenticated: boolean;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  selectedAddressId: string | null;
}

const initialState: UserState = {
  authenticated: false,
  name: '',
  email: '',
  phone: '',
  addresses: [],
  selectedAddressId: null,
};

function addrKey(phone: string) {
  return `nikskart-addr-${phone}`;
}

function loadAddresses(phone: string): { addresses: Address[]; selectedAddressId: string | null } {
  try {
    const raw = localStorage.getItem(addrKey(phone));
    return raw ? JSON.parse(raw) : { addresses: [], selectedAddressId: null };
  } catch {
    return { addresses: [], selectedAddressId: null };
  }
}

function saveAddresses(phone: string, data: { addresses: Address[]; selectedAddressId: string | null }) {
  localStorage.setItem(addrKey(phone), JSON.stringify(data));
}

// Derives a stable internal email from a phone number so Supabase email-auth
// can be used without asking customers for their email address.
function phoneToEmail(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return `${digits}@nikskart.users`;
}

export function useAuth() {
  const [user, setUser] = useState<UserState>(initialState);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const meta = session.user.user_metadata ?? {};
        const phone = meta.phone ?? '';
        const name = meta.name || phone || session.user.email?.split('@')[0] || '';
        const { addresses, selectedAddressId } = loadAddresses(phone);
        setUser({ authenticated: true, name, email: session.user.email ?? '', phone, addresses, selectedAddressId });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata ?? {};
        const phone = meta.phone ?? '';
        const name = meta.name || phone || session.user.email?.split('@')[0] || '';
        const { addresses, selectedAddressId } = loadAddresses(phone);
        setUser({ authenticated: true, name, email: session.user.email ?? '', phone, addresses, selectedAddressId });
      } else {
        setUser(initialState);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (phone: string, password: string): Promise<string | null> => {
    const email = phoneToEmail(phone);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  };

  const signup = async (phone: string, password: string): Promise<string | null> => {
    const email = phoneToEmail(phone);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { phone } },
    });
    return error?.message ?? null;
  };

  const logout = () => {
    supabase.auth.signOut();
  };

  const addAddress = (address: Omit<Address, 'id'>): string => {
    const id = crypto.randomUUID?.() ?? `${Date.now()}`;
    const newAddr: Address = { id, ...address };
    setUser((cur) => {
      const addresses = [...cur.addresses, newAddr];
      saveAddresses(cur.phone || cur.email, { addresses, selectedAddressId: id });
      return { ...cur, addresses, selectedAddressId: id };
    });
    return id;
  };

  const selectAddress = (id: string) => {
    setUser((cur) => {
      saveAddresses(cur.phone || cur.email, { addresses: cur.addresses, selectedAddressId: id });
      return { ...cur, selectedAddressId: id };
    });
  };

  const removeAddress = (id: string) => {
    setUser((cur) => {
      const addresses = cur.addresses.filter((a) => a.id !== id);
      const selectedAddressId = cur.selectedAddressId === id ? null : cur.selectedAddressId;
      saveAddresses(cur.phone || cur.email, { addresses, selectedAddressId });
      return { ...cur, addresses, selectedAddressId };
    });
  };

  return { user, login, signup, logout, addAddress, selectAddress, removeAddress };
}
