import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { products as staticProducts, sampleProducts, Product } from '../data/products';

// Show sample products only for categories that have no real products yet.
const withSamples = (list: Product[]) => {
  const have = new Set(list.map((p) => p.category));
  return [...list, ...sampleProducts.filter((p) => !have.has(p.category))];
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() => withSamples(staticProducts));
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setProducts(withSamples(data.map((r) => ({
          id: String(r.id),
          slug: r.slug || String(r.id),
          name: r.name,
          category: r.category,
          price: r.price,
          discount: r.discount || '',
          image: r.image || '',
          rating: r.rating || 4.5,
          description: r.description || '',
          badge: r.badge || '',
        }))));
      }
    } catch {
      // fall back to static products
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return { products, loading, reload: load };
}
