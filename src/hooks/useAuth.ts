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
  addresses: Address[];
  selectedAddressId: string | null;
}

const initialState: UserState = {
  authenticated: false,
  name: '',
  email: '',
  addresses: [],
  selectedAddressId: null,
};

function addrKey(email: string) {
  return `nikskart-addr-${email}`;
}

function loadAddresses(email: string): { addresses: Address[]; selectedAddressId: string | null } {
  try {
    const raw = localStorage.getItem(addrKey(email));
    return raw ? JSON.parse(raw) : { addresses: [], selectedAddressId: null };
  } catch {
    return { addresses: [], selectedAddressId: null };
  }
}

function saveAddresses(email: string, data: { addresses: Address[]; selectedAddressId: string | null }) {
  localStorage.setItem(addrKey(email), JSON.stringify(data));
}

export function useAuth() {
  const [user, setUser] = useState<UserState>(initialState);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const email = session.user.email ?? '';
        const name = session.user.user_metadata?.name || email.split('@')[0];
        const { addresses, selectedAddressId } = loadAddresses(email);
        setUser({ authenticated: true, name, email, addresses, selectedAddressId });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const email = session.user.email ?? '';
        const name = session.user.user_metadata?.name || email.split('@')[0];
        const { addresses, selectedAddressId } = loadAddresses(email);
        setUser({ authenticated: true, name, email, addresses, selectedAddressId });
      } else {
        setUser(initialState);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  };

  const signup = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signUp({ email, password });
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
      saveAddresses(cur.email, { addresses, selectedAddressId: id });
      return { ...cur, addresses, selectedAddressId: id };
    });
    return id;
  };

  const selectAddress = (id: string) => {
    setUser((cur) => {
      saveAddresses(cur.email, { addresses: cur.addresses, selectedAddressId: id });
      return { ...cur, selectedAddressId: id };
    });
  };

  const removeAddress = (id: string) => {
    setUser((cur) => {
      const addresses = cur.addresses.filter((a) => a.id !== id);
      const selectedAddressId = cur.selectedAddressId === id ? null : cur.selectedAddressId;
      saveAddresses(cur.email, { addresses, selectedAddressId });
      return { ...cur, addresses, selectedAddressId };
    });
  };

  return { user, login, signup, logout, addAddress, selectAddress, removeAddress };
}
