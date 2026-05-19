import { useEffect, useMemo, useState } from 'react';
import { Product } from '../data/products';

const storageKey = 'nikskart-wishlist';

export function useWishlist() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((current) => {
      if (current.some((item) => item.id === product.id)) {
        return current;
      }
      return [...current, product];
    });
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const toggleItem = (product: Product) => {
    setItems((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    );
  };

  const hasItem = (id: string) => items.some((item) => item.id === id);

  const count = useMemo(() => items.length, [items]);

  return { items, count, addItem, removeItem, toggleItem, hasItem };
}
