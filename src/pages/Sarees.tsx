import { Product } from '../data/products';
import CategoryPageLayout from '../components/CategoryPageLayout';

interface SareesProps {
  cart: { addItem: (p: Product) => void };
  wishlist: { toggleItem: (p: Product) => void; hasItem: (id: string) => boolean };
}

export default function Sarees({ cart, wishlist }: SareesProps) {
  return (
    <CategoryPageLayout
      category="Sarees"
      seoTitle="Buy Sarees Online India – Banarasi, Kanjivaram, Silk & Chiffon | Nikskart"
      seoDescription="Shop premium sarees online in India — Banarasi silk, Kanjivaram, Mysore silk, chiffon & georgette sarees for weddings, festivals & everyday wear. Easy 15-day returns."
      heroTitle="Sarees"
      heroSubtitle="Timeless drapes for every occasion — weddings, festivals and everyday elegance."
      heroGradient="linear-gradient(135deg, #6b1e1e 0%, #a0522d 50%, #c9a46e 100%)"
      breadcrumbLabel="Sarees"
      schemaDescription="Premium sarees collection at Nikskart — Banarasi, Kanjivaram, Mysore Silk, Chiffon and Georgette sarees."
      categoryIntro="Explore our curated collection of sarees online — from the royal weaves of Banarasi silk and Kanjivaram to lightweight chiffon, georgette and cotton drapes. Whether you're dressing for a wedding, Diwali, Navratri or everyday elegance, find the perfect saree at Nikskart with authentic fabrics, rich embroidery and easy 15-day returns across India."
      relatedCategories={[
        { label: 'Shop Kurtis', to: '/kurtis' },
        { label: 'Shop Artificial Jewellery', to: '/artificial-jewellery' },
      ]}
      cart={cart}
      wishlist={wishlist}
    />
  );
}
