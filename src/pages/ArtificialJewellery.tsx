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
      seoDescription="Shop artificial jewellery online in India — Kundan necklace sets, Polki maang tikka, temple gold earrings, lac bangles & oxidised jhumkas. Bridal & festive jewellery at affordable prices."
      heroTitle="Artificial Jewellery"
      heroSubtitle="Handcrafted Kundan, Polki and temple gold pieces — bridal, festive and everyday adornment."
      heroGradient="linear-gradient(135deg, #3d1a5c 0%, #7b3fa0 50%, #c9a46e 100%)"
      breadcrumbLabel="Artificial Jewellery"
      schemaDescription="Artificial jewellery collection at Nikskart — Kundan, Polki, temple gold, lac bangles and oxidised silver jewellery."
      categoryIntro="Discover handcrafted artificial jewellery online — Kundan necklace sets, Polki maang tikka, temple gold earrings, lac bangles, Jadau chokers and oxidised silver jhumkas. Perfect for brides, festive celebrations and everyday ethnic styling. Our jewellery is crafted to complement every saree and kurti at affordable prices with easy returns across India."
      relatedCategories={[
        { label: 'Shop Sarees', to: '/sarees' },
        { label: 'Shop Kurtis', to: '/kurtis' },
      ]}
      cart={cart}
      wishlist={wishlist}
    />
  );
}
