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
      seoTitle="Buy Artificial Jewellery Online India – Kundan, Polki & Temple Gold | Nikskart"
      seoDescription="Shop artificial jewellery online in India — Kundan necklace sets, Polki maang tikka, temple gold earrings for ethnic wear. Bridal & festive jewellery at affordable prices."
      heroTitle="Artificial Jewellery"
      heroSubtitle="Handcrafted Kundan, Polki and temple gold — bridal, festive and everyday ethnic wear jewellery."
      heroGradient="linear-gradient(135deg, #3d1a5c 0%, #7b3fa0 50%, #c9a46e 100%)"
      breadcrumbLabel="Artificial Jewellery"
      schemaDescription="Artificial jewellery for ethnic wear at Nikskart — Kundan, Polki, temple gold, lac bangles and oxidised silver jewellery."
      categoryIntro="Buy artificial jewellery online in India — the perfect ethnic wear accessories for women. Our collection features handcrafted Kundan necklace sets, Polki maang tikka, temple gold earrings, lac bangles, Jadau chokers and oxidised silver jhumkas. Artificial jewellery is the ideal complement to every saree and kurti, offering bridal-quality craftsmanship at affordable prices. Shop Kundan sets for weddings, temple gold for festivals, or oxidised jhumkas for everyday ethnic wear — all with easy 15-day returns across India."
      relatedCategories={[
        { label: 'Shop Sarees', to: '/sarees' },
        { label: 'Shop Kurtis', to: '/kurtis' },
      ]}
      cart={cart}
      wishlist={wishlist}
    />
  );
}
