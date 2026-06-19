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
      seoTitle="Buy Kurtis Online India – Ethnic Kurti Sets & Designer Kurtis | Nikskart"
      seoDescription="Shop ethnic kurtis online in India — Banarasi brocade kurti sets, handblock print, silk & cotton kurtis. Festive, casual & office styles with easy returns."
      heroTitle="Kurtis"
      heroSubtitle="Comfort meets ethnic elegance — handcrafted kurtis for every woman and every day."
      heroGradient="linear-gradient(135deg, #2d3a6e 0%, #5b6abf 50%, #c9a46e 100%)"
      breadcrumbLabel="Kurtis"
      schemaDescription="Ethnic kurtis collection at Nikskart — brocade, handblock print, silk and cotton kurti sets."
      categoryIntro="Browse our ethnic kurti collection online — Banarasi brocade kurti sets, handblock print cotton kurtis, festive silk kurtis, Chanderi sets and party-wear kurti gowns. Styled for Indian women who love comfort and tradition, our kurtis are perfect for the office, festivals, casual outings and celebrations. Shop with easy returns across India."
      relatedCategories={[
        { label: 'Shop Sarees', to: '/sarees' },
        { label: 'Shop Artificial Jewellery', to: '/artificial-jewellery' },
      ]}
      cart={cart}
      wishlist={wishlist}
    />
  );
}
