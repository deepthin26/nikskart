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
      seoTitle="Buy Designer Sarees Online India – Banarasi, Kanjivaram, Silk & Chiffon | Nikskart"
      seoDescription="Shop designer sarees online in India — Banarasi silk, Kanjivaram, Mysore silk, chiffon & georgette sarees for weddings, festivals & everyday ethnic wear. Easy 15-day returns."
      heroTitle="Sarees"
      heroSubtitle="Designer sarees for every occasion — weddings, festivals and everyday elegance."
      heroGradient="linear-gradient(135deg, #6b1e1e 0%, #a0522d 50%, #c9a46e 100%)"
      breadcrumbLabel="Sarees"
      schemaDescription="Designer sarees collection at Nikskart — Banarasi, Kanjivaram, Mysore Silk, Chiffon and Georgette sarees for ethnic wear."
      categoryIntro="Shop designer sarees online in India — the finest ethnic wear for women sourced directly from Indian weavers. Our curated saree collection includes Banarasi silk sarees, Kanjivaram silk sarees, Mysore silk, lightweight chiffon sarees, georgette and cotton sarees. Whether you need a bridal saree, a festive saree for Diwali or Navratri, or an everyday cotton drape, Nikskart has the perfect saree at affordable prices. All sarees come with authentic fabric guarantees and easy 15-day returns across India."
      relatedCategories={[
        { label: 'Shop Kurtis', to: '/kurtis' },
        { label: 'Shop Artificial Jewellery', to: '/artificial-jewellery' },
      ]}
      cart={cart}
      wishlist={wishlist}
    />
  );
}
