import { useParams } from 'react-router-dom';
import { Product } from '../data/products';
import CategoryPageLayout from '../components/CategoryPageLayout';
import NotFound from './NotFound';
import { CATEGORY_LIST, COLLECTIONS, GROUPS, categoryPath } from '../data/categories';

interface CollectionProps {
  cart: { addItem: (p: Product) => void };
  wishlist: { toggleItem: (p: Product) => void; hasItem: (id: string) => boolean };
}

const GRADIENT = 'linear-gradient(135deg, #0a0a0a 0%, #3a2c1a 55%, #c9a46e 100%)';

// stable filter functions for the Women / Men / Watches group pages
const groupFilters = Object.fromEntries(
  GROUPS.map((g) => {
    const cats = CATEGORY_LIST.filter((c) => c.group === g.key).map((c) => c.category);
    return [g.slug, (p: Product) => cats.includes(p.category)];
  })
) as Record<string, (p: Product) => boolean>;

export default function Collection({ cart, wishlist }: CollectionProps) {
  const { slug = '' } = useParams();

  const cat = CATEGORY_LIST.find((c) => c.slug === slug);
  const coll = COLLECTIONS.find((c) => c.slug === slug);
  const group = GROUPS.find((g) => g.slug === slug);

  if (!cat && !coll && !group) return <NotFound />;

  const title = cat ? (cat.group === 'men' ? `Men's ${cat.label}` : cat.label) : coll ? coll.label : `${group!.label}${group!.key === 'watches' ? '' : "'s Jewellery"}`;
  const subtitle = cat?.subtitle ?? coll?.subtitle ?? group!.subtitle;

  // related links: siblings in the same group, or the main groups for collections
  const related = cat
    ? CATEGORY_LIST.filter((c) => c.group === cat.group && c.slug !== cat.slug).slice(0, 4)
        .map((c) => ({ label: `Shop ${c.label}`, to: categoryPath(c.slug) }))
    : GROUPS.filter((g) => g.slug !== slug).map((g) => ({ label: `Shop ${g.label}`, to: categoryPath(g.slug) }));

  return (
    <CategoryPageLayout
      key={slug}
      category={cat?.category ?? title}
      filter={cat ? undefined : coll ? coll.filter : groupFilters[slug]}
      path={`collections/${slug}`}
      seoTitle={`Buy ${title} Online India – Anti-Tarnish Jewellery & Watches | Nikskart`}
      seoDescription={`Shop ${title.toLowerCase()} online at Nikskart — ${subtitle.toLowerCase()}. Secure payments and easy returns across India.`}
      heroTitle={title}
      heroSubtitle={subtitle}
      heroGradient={GRADIENT}
      breadcrumbLabel={title}
      schemaDescription={`${title} at Nikskart — ${subtitle}.`}
      categoryIntro={`Discover ${title.toLowerCase()} at Nikskart — ${subtitle.toLowerCase()}. Our pieces are designed for everyday wear: waterproof, sweat-proof and skin-friendly, with secure Razorpay checkout and easy returns across India.`}
      relatedCategories={related}
      cart={cart}
      wishlist={wishlist}
    />
  );
}
