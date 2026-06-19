import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSeoMeta } from '../hooks/useSeoMeta';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../data/products';
import ProductGrid from './ProductGrid';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';
type PriceFilter = 'all' | 'under-1000' | '1000-3000' | '3000-6000' | 'over-6000';

interface CategoryPageLayoutProps {
  category: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroGradient: string;
  breadcrumbLabel: string;
  schemaDescription: string;
  cart: { addItem: (p: Product) => void };
  wishlist: { toggleItem: (p: Product) => void; hasItem: (id: string) => boolean };
}

const sortLabels: Record<SortOption, string> = {
  default: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  rating: 'Top Rated',
};

const priceFilterLabels: Record<PriceFilter, string> = {
  'all': 'All Prices',
  'under-1000': 'Under ₹1,000',
  '1000-3000': '₹1,000 – ₹3,000',
  '3000-6000': '₹3,000 – ₹6,000',
  'over-6000': 'Above ₹6,000',
};

export default function CategoryPageLayout({
  category, seoTitle, seoDescription, heroTitle, heroSubtitle,
  heroGradient, breadcrumbLabel, schemaDescription, cart, wishlist,
}: CategoryPageLayoutProps) {
  useSeoMeta(seoTitle, seoDescription);
  const { products } = useProducts();
  const [sort, setSort] = useState<SortOption>('default');
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');

  const categoryProducts = useMemo(() => {
    let filtered = products.filter((p: Product) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (priceFilter === 'under-1000') filtered = filtered.filter((p) => p.price < 1000);
    else if (priceFilter === '1000-3000') filtered = filtered.filter((p) => p.price >= 1000 && p.price <= 3000);
    else if (priceFilter === '3000-6000') filtered = filtered.filter((p) => p.price > 3000 && p.price <= 6000);
    else if (priceFilter === 'over-6000') filtered = filtered.filter((p) => p.price > 6000);
    if (sort === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === 'rating') return [...filtered].sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [products, category, sort, search, priceFilter]);

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nikskart.com/' },
            { '@type': 'ListItem', position: 2, name: 'Women', item: 'https://www.nikskart.com/' },
            { '@type': 'ListItem', position: 3, name: breadcrumbLabel },
          ],
        },
        {
          '@type': 'ItemList',
          name: heroTitle,
          description: schemaDescription,
          numberOfItems: categoryProducts.length,
          itemListElement: categoryProducts.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Product',
              name: p.name,
              image: p.image,
              offers: {
                '@type': 'Offer',
                price: p.price,
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
              },
            },
          })),
        },
      ],
    };

    const existing = document.getElementById('category-schema');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = 'category-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.getElementById('category-schema')?.remove(); };
  }, [categoryProducts, breadcrumbLabel, heroTitle, schemaDescription]);

  return (
    <main className="category-page">
      {/* Hero */}
      <div className="category-page-hero" style={{ background: heroGradient }}>
        <div className="category-page-hero-inner">
          <nav className="category-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Women</span>
            <span>/</span>
            <span>{breadcrumbLabel}</span>
          </nav>
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>
          <span className="category-page-count">{categoryProducts.length} products</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="category-toolbar">
        <p className="category-toolbar-count">
          Showing <strong>{categoryProducts.length}</strong> {breadcrumbLabel}
        </p>
        <div className="category-toolbar-controls">
          <input
            className="category-search-input"
            type="search"
            placeholder={`Search ${breadcrumbLabel.toLowerCase()}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={`Search ${breadcrumbLabel}`}
          />
          <div className="category-sort">
            <label htmlFor="price-select">Price</label>
            <select
              id="price-select"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
            >
              {(Object.keys(priceFilterLabels) as PriceFilter[]).map((key) => (
                <option key={key} value={key}>{priceFilterLabels[key]}</option>
              ))}
            </select>
          </div>
          <div className="category-sort">
            <label htmlFor="sort-select">Sort</label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
            >
              {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                <option key={key} value={key}>{sortLabels[key]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="page-content" style={{ paddingTop: 0 }}>
        {categoryProducts.length === 0 ? (
          <div className="empty-cart">
            <p>No products found in this category yet.</p>
            <Link className="primary-button" to="/">Shop All</Link>
          </div>
        ) : (
          <ProductGrid products={categoryProducts} cart={cart} wishlist={wishlist} />
        )}
      </div>
    </main>
  );
}
