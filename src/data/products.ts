export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discount: string;
  image: string;
  rating: number;
  description: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Banarasi Silk Saree',
    category: 'Sarees',
    price: 5499,
    discount: '35% off',
    image: 'https://images.unsplash.com/photo-1534600976687-5adbb1c0d034?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    description: 'Luxurious Banarasi silk saree with rich zari work and heritage charm.',
    badge: 'Best Seller'
  },
  {
    id: '2',
    name: 'Chiffon Floral Saree',
    category: 'Sarees',
    price: 2899,
    discount: '40% off',
    image: 'https://images.unsplash.com/photo-1520975688800-af0de3b6b530?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    description: 'Lightweight chiffon saree with delicate floral motifs for festive occasions.',
    badge: 'New'
  },
  {
    id: '3',
    name: 'Silk Cotton Kasavu Saree',
    category: 'Sarees',
    price: 3299,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    description: 'Traditional Kasavu saree in silk cotton with golden border and timeless grace.',
    badge: 'Limited'
  },
  {
    id: '4',
    name: 'Banarasi Brocade Kurti Set',
    category: 'Kurtis',
    price: 2599,
    discount: '25% off',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    description: 'Elegant kurti set in brocade fabric with embroidered detailing.',
    badge: 'Trending'
  },
  {
    id: '5',
    name: 'Handblock Print Kurti',
    category: 'Kurtis',
    price: 1799,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    description: 'Breathable cotton kurti with traditional handblock print for everyday wear.',
    badge: 'Top Rated'
  },
  {
    id: '6',
    name: 'Embroidered Silk Kurti',
    category: 'Kurtis',
    price: 2199,
    discount: '20% off',
    image: 'https://images.unsplash.com/photo-1520975694503-02d3c490dbe8?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    description: 'Festive silk kurti with rich embroidery and elegant stitching.',
    badge: 'Popular'
  },
  {
    id: '7',
    name: 'Mysore Silk Saree',
    category: 'Sarees',
    price: 4799,
    discount: '28% off',
    image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    description: 'Soft Mysore silk saree with subtle shine and graceful fall.',
    badge: 'Editor Pick'
  },
  {
    id: '8',
    name: 'Printed Georgette Saree',
    category: 'Sarees',
    price: 2399,
    discount: '33% off',
    image: 'https://images.unsplash.com/photo-1522136911466-8c1657e5098d?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    description: 'Trendy georgette saree with vibrant prints and easy drape.',
    badge: 'Family Favourite'
  },
  {
    id: '9',
    name: 'Partywear Kurti Gown',
    category: 'Kurtis',
    price: 2999,
    discount: '22% off',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    description: 'Flowy kurti gown styled for festive celebrations and evening events.',
    badge: 'Back to Office'
  },
  {
    id: '10',
    name: 'Silk Blend Kurti',
    category: 'Kurtis',
    price: 1999,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1566753323558-f4e73543a495?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    description: 'Comfortable silk blend kurti with subtle embroidery and modern cut.',
    badge: 'Deal'
  },
  {
    id: '11',
    name: 'Kanjivaram Silk Saree',
    category: 'Sarees',
    price: 6299,
    discount: '27% off',
    image: 'https://images.unsplash.com/photo-1520972451188-933c5e89f5b4?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    description: 'Classic Kanjivaram saree with luxurious texture and traditional motifs.',
    badge: 'Premium'
  },
  {
    id: '12',
    name: 'Anna Salwar Kurti',
    category: 'Kurtis',
    price: 1699,
    discount: '35% off',
    image: 'https://images.unsplash.com/photo-1614251055880-b72b89ff2db3?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    description: 'Classic salwar kameez set with soft cotton kurti and matching bottoms.',
    badge: 'Limited Stock'
  },
  {
    id: '13',
    name: 'Kundan Necklace Set',
    category: 'Artificial Jewellery',
    price: 3499,
    discount: '20% off',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    description: 'Handcrafted Kundan necklace with matching earrings for bridal and festive occasions.',
    badge: 'Best Seller'
  },
  {
    id: '14',
    name: 'Temple Gold Earrings',
    category: 'Artificial Jewellery',
    price: 1299,
    discount: '15% off',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    description: 'Traditional temple-style gold-plated earrings with intricate deity motifs.',
    badge: 'New'
  },
  {
    id: '15',
    name: 'Lac Bangle Set',
    category: 'Artificial Jewellery',
    price: 899,
    discount: '25% off',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    description: 'Vibrant lac bangles with mirror work, perfect for festive and bridal wear.',
    badge: 'Trending'
  },
  {
    id: '16',
    name: 'Polki Diamond Maang Tikka',
    category: 'Artificial Jewellery',
    price: 2199,
    discount: '18% off',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88552?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    description: 'Stunning Polki-style maang tikka with uncut stones and gold-plated finish.',
    badge: 'Premium'
  },
  {
    id: '17',
    name: 'Oxidised Silver Jhumkas',
    category: 'Artificial Jewellery',
    price: 749,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1630018548696-e22d66d62cde?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    description: 'Classic oxidised silver jhumka earrings with floral detailing for everyday ethnic looks.',
    badge: 'Top Rated'
  },
  {
    id: '18',
    name: 'Jadau Choker Necklace',
    category: 'Artificial Jewellery',
    price: 4299,
    discount: '22% off',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    description: 'Royal Jadau choker with emerald and ruby stones set in gold-plated brass.',
    badge: 'Editor Pick'
  },
  {
    id: '19',
    name: 'Chanderi Silk Kurti Set',
    category: 'Kurtis',
    price: 2399,
    discount: '28% off',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    description: 'Elegant Chanderi silk kurti with delicate block print, lightweight fabric and a relaxed festive silhouette.',
    badge: 'New'
  }
];
