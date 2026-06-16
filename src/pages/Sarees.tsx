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
      seoTitle="Buy Sarees Online – Silk, Chiffon & Banarasi | Nikskart"
      seoDescription="Shop premium sarees online at Nikskart — Banarasi silk, Kanjivaram, Mysore silk, chiffon and georgette sarees. Free delivery above ₹2,999."
      heroTitle="Sarees"
      heroSubtitle="Timeless drapes for every occasion — weddings, festivals and everyday elegance."
      heroGradient="linear-gradient(135deg, #6b1e1e 0%, #a0522d 50%, #c9a46e 100%)"
      breadcrumbLabel="Sarees"
      schemaDescription="Premium sarees collection at Nikskart — Banarasi, Kanjivaram, Mysore Silk, Chiffon and Georgette sarees."
      cart={cart}
      wishlist={wishlist}
    />
  );
}
