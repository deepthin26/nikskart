import { Product } from './products';

// ─────────────────────────────────────────────────────────────
//  Store categories (jewellery + watches).
//  `category` must match the product's `category` field exactly
//  (this is also what the Admin dashboard saves to Supabase).
// ─────────────────────────────────────────────────────────────
export interface CategoryDef {
  slug: string;
  category: string;
  label: string;
  group: 'women' | 'men' | 'watches';
  subtitle: string;
}

export const CATEGORY_LIST: CategoryDef[] = [
  // Women
  { slug: 'earrings',        category: 'Earrings',            label: 'Earrings',            group: 'women',   subtitle: 'Studs, hoops, danglers & ear cuffs' },
  { slug: 'necklaces',       category: 'Necklaces',           label: 'Necklaces',           group: 'women',   subtitle: 'Chains, chokers, layered & pearl' },
  { slug: 'pendants',        category: 'Pendants',            label: 'Pendants',            group: 'women',   subtitle: 'Evil eye, initial, solitaire & heart' },
  { slug: 'rings',           category: 'Rings',               label: 'Rings',               group: 'women',   subtitle: 'Adjustable, solitaire & statement' },
  { slug: 'bracelets',       category: 'Bracelets',           label: 'Bracelets',           group: 'women',   subtitle: 'Chain, cuff, charm & tennis' },
  { slug: 'anklets',         category: 'Anklets',             label: 'Anklets',             group: 'women',   subtitle: 'Dainty everyday anklets' },
  { slug: 'mangalsutra',     category: 'Mangalsutra',         label: 'Mangalsutra',         group: 'women',   subtitle: 'Modern everyday mangalsutras' },
  { slug: 'jewellery-sets',  category: 'Jewellery Sets',      label: 'Jewellery Sets',      group: 'women',   subtitle: 'Necklace & earring sets' },
  { slug: 'artificial-jewellery', category: 'Artificial Jewellery', label: 'Kundan & Ethnic', group: 'women', subtitle: 'Kundan, Polki & temple gold' },
  // Men
  { slug: 'mens-chains',     category: "Men's Chains",        label: 'Chains',              group: 'men',     subtitle: 'Cuban, rope & box chains' },
  { slug: 'mens-rings',      category: "Men's Rings",         label: 'Rings',               group: 'men',     subtitle: 'Bands & signet rings' },
  { slug: 'mens-bracelets',  category: "Men's Bracelets",     label: 'Bracelets & Kada',    group: 'men',     subtitle: 'Kada, chain & beaded' },
  { slug: 'mens-pendants',   category: "Men's Pendants",      label: 'Pendants',            group: 'men',     subtitle: 'Spiritual & minimal pendants' },
  // Watches
  { slug: 'womens-watches',  category: "Women's Watches",     label: "Women's Watches",     group: 'watches', subtitle: 'Bracelet, mesh & leather straps' },
  { slug: 'mens-watches',    category: "Men's Watches",       label: "Men's Watches",       group: 'watches', subtitle: 'Chronograph, minimal & leather' },
  { slug: 'couple-watches',  category: 'Couple Watches',      label: 'Couple Watches',      group: 'watches', subtitle: 'His & hers gift sets' },
];

export const GROUPS: { key: CategoryDef['group']; label: string; slug: string; subtitle: string }[] = [
  { key: 'women',   label: 'Women',   slug: 'women',   subtitle: 'Anti-tarnish jewellery for her' },
  { key: 'men',     label: 'Men',     slug: 'men',     subtitle: 'Chains, rings, kadas & more' },
  { key: 'watches', label: 'Watches', slug: 'watches', subtitle: 'Timepieces for him, her & both' },
];

const WATCH_CATS = CATEGORY_LIST.filter((c) => c.group === 'watches').map((c) => c.category);
const JEWELLERY_CATS = CATEGORY_LIST.filter((c) => c.group !== 'watches').map((c) => c.category);

/** All categories shown on the storefront (sarees/kurtis are no longer listed). */
export const STORE_CATEGORIES = CATEGORY_LIST.map((c) => c.category);
export const isStoreProduct = (p: Product) => STORE_CATEGORIES.includes(p.category);

const badgeIs = (p: Product, ...names: string[]) =>
  names.some((n) => (p.badge || '').toLowerCase() === n.toLowerCase());

export interface CollectionDef {
  slug: string;
  label: string;
  subtitle: string;
  filter: (p: Product) => boolean;
}

/** Curated collections, like the reference sites' top nav. */
export const COLLECTIONS: CollectionDef[] = [
  { slug: 'anti-tarnish', label: 'Anti-Tarnish', subtitle: 'Waterproof · Sweatproof · Skin-safe',
    filter: (p) => JEWELLERY_CATS.includes(p.category) && p.category !== 'Artificial Jewellery' },
  { slug: 'best-sellers', label: 'Best Sellers', subtitle: 'Our most-loved pieces',
    filter: (p) => isStoreProduct(p) && (badgeIs(p, 'Best Seller', 'Bestseller', 'Top Rated') || p.rating >= 4.8) },
  { slug: 'new-arrivals', label: 'New Arrivals', subtitle: 'Fresh this season',
    filter: (p) => isStoreProduct(p) && badgeIs(p, 'New', 'New Arrival', 'Trending') },
  { slug: 'gifting', label: 'Gifting', subtitle: 'Ready-to-gift picks',
    filter: (p) => ['Pendants', 'Jewellery Sets', 'Bracelets', ...WATCH_CATS].includes(p.category) || badgeIs(p, 'Gift Set') },
  { slug: 'under-999', label: 'Under ₹999', subtitle: 'Everyday luxe for less',
    filter: (p) => isStoreProduct(p) && p.price < 1000 },
];

export const categoryPath = (slug: string) => `/collections/${slug}`;
