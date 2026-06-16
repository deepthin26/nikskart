import { Product } from '../data/products';
import CategoryPageLayout from '../components/CategoryPageLayout';

interface ArtificialJewelleryProps {
  cart: { addItem: (p: Product) => void };
  wishlist: { toggleItem: (p: Product) => void; hasItem: (id: string) => boolean };
}

export default function ArtificialJewellery({ cart, wishlist }: ArtificialJewelleryProps) {
  return (
    <CategoryPageLayout
      category="Artificial Jewellery"
      seoTitle="Buy Artificial Jewellery Online – Kundan, Polki & Temple Gold | Nikskart"
      seoDescription="Shop artificial jewellery at Nikskart — Kundan necklaces, Polki maang tikka, temple gold earrings, lac bangles and oxidised jhumkas. Free delivery above ₹2,999."
      heroTitle="Artificial Jewellery"
      heroSubtitle="Handcrafted Kundan, Polki and temple gold pieces — bridal, festive and everyday adornment."
      heroGradient="linear-gradient(135deg, #3d1a5c 0%, #7b3fa0 50%, #c9a46e 100%)"
      breadcrumbLabel="Artificial Jewellery"
      schemaDescription="Artificial jewellery collection at Nikskart — Kundan, Polki, temple gold, lac bangles and oxidised silver jewellery."
      cart={cart}
      wishlist={wishlist}
    />
  );
}
