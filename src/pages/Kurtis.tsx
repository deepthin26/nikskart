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
      seoTitle="Buy Cotton Kurtis Online India – Ethnic Kurti Sets & Designer Kurtis | Nikskart"
      seoDescription="Shop cotton kurtis online in India — handblock print cotton kurtis, Banarasi brocade kurti sets, silk & designer kurtis. Ethnic wear for women with easy returns."
      heroTitle="Kurtis"
      heroSubtitle="Cotton kurtis & designer ethnic wear — comfort meets Indian craftsmanship."
      heroGradient="linear-gradient(135deg, #2d3a6e 0%, #5b6abf 50%, #c9a46e 100%)"
      breadcrumbLabel="Kurtis"
      schemaDescription="Cotton kurtis and designer ethnic kurtis at Nikskart — handblock print, brocade, silk and Chanderi kurti sets for women."
      categoryIntro="Buy cotton kurtis online in India — ethnic wear for women crafted by Indian artisans. Our kurti collection features breathable handblock print cotton kurtis, Banarasi brocade kurti sets, festive silk kurtis, Chanderi sets and party-wear kurti gowns. Whether you need a casual everyday cotton kurti, an office-ready designer kurti or a festive silk set, Nikskart has the perfect ethnic wear at affordable prices. Shop designer kurtis with easy 15-day returns delivered across India."
      relatedCategories={[
        { label: 'Shop Sarees', to: '/sarees' },
        { label: 'Shop Artificial Jewellery', to: '/artificial-jewellery' },
      ]}
      cart={cart}
      wishlist={wishlist}
    />
  );
}
