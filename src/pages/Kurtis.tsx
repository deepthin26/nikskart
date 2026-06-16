import { Product } from '../data/products';
import CategoryPageLayout from '../components/CategoryPageLayout';

interface KurtisProps {
  cart: { addItem: (p: Product) => void };
  wishlist: { toggleItem: (p: Product) => void; hasItem: (id: string) => boolean };
}

export default function Kurtis({ cart, wishlist }: KurtisProps) {
  return (
    <CategoryPageLayout
      category="Kurtis"
      seoTitle="Buy Kurtis Online – Ethnic Kurtis & Kurti Sets | Nikskart"
      seoDescription="Shop ethnic kurtis online at Nikskart — Banarasi brocade, handblock print, silk and cotton kurtis. Festive & everyday styles. Free delivery above ₹2,999."
      heroTitle="Kurtis"
      heroSubtitle="Comfort meets ethnic elegance — handcrafted kurtis for every woman and every day."
      heroGradient="linear-gradient(135deg, #2d3a6e 0%, #5b6abf 50%, #c9a46e 100%)"
      breadcrumbLabel="Kurtis"
      schemaDescription="Ethnic kurtis collection at Nikskart — brocade, handblock print, silk and cotton kurti sets."
      cart={cart}
      wishlist={wishlist}
    />
  );
}
