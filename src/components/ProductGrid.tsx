import { Product } from '../data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  cart: {
    addItem: (product: Product) => void;
  };
  wishlist: {
    toggleItem: (product: Product) => void;
    hasItem: (id: string) => boolean;
  };
}

export default function ProductGrid({ products, cart, wishlist }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addItem={cart.addItem}
          toggleWishlist={wishlist.toggleItem}
          isWishlisted={wishlist.hasItem(product.id)}
        />
      ))}
    </div>
  );
}
