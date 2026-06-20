export interface Product {
  id: string;
  slug: string;
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
    slug: 'banarasi-silk-saree',
    name: 'Banarasi Silk Saree',
    category: 'Sarees',
    price: 5499,
    discount: '35% off',
    image: 'https://images.unsplash.com/photo-1534600976687-5adbb1c0d034?auto=format&fit=crop&w=600&q=75',
    rating: 4.8,
    description: 'Handwoven Banarasi silk saree featuring intricate gold and silver zari work on a pure silk base. Crafted by master weavers of Varanasi, this 6.5-metre bridal saree drapes gracefully with a rich pallu of woven temple motifs. A treasured choice for weddings, receptions and grand festive occasions. Pairs beautifully with Kundan or Polki jewellery for a complete bridal look.',
    badge: 'Best Seller'
  },
  {
    id: '2',
    slug: 'chiffon-floral-saree',
    name: 'Chiffon Floral Saree',
    category: 'Sarees',
    price: 2899,
    discount: '40% off',
    image: 'https://images.unsplash.com/photo-1520975688800-af0de3b6b530?auto=format&fit=crop&w=600&q=75',
    rating: 4.6,
    description: 'Flowy lightweight chiffon saree with elegant floral digital prints in vibrant festive colours. This easy-drape saree is ideal for parties, office ethnic days and family gatherings — comfortable enough for all-day wear. Comes with an unstitched matching blouse piece. An affordable, stylish addition to any ethnic wear wardrobe.',
    badge: 'New'
  },
  {
    id: '3',
    slug: 'silk-cotton-kasavu-saree',
    name: 'Silk Cotton Kasavu Saree',
    category: 'Sarees',
    price: 3299,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=75',
    rating: 4.7,
    description: 'Authentic Kerala-style Kasavu saree in breathable silk-cotton blend with a traditional golden Kasavu border. The timeless cream and gold combination is the first choice for Onam, Vishu and temple occasions. Drapes effortlessly and is ideal for women who appreciate understated elegance in ethnic wear. Blouse piece included.',
    badge: 'Limited'
  },
  {
    id: '4',
    slug: 'banarasi-brocade-kurti-set',
    name: 'Banarasi Brocade Kurti Set',
    category: 'Kurtis',
    price: 2599,
    discount: '25% off',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=75',
    rating: 4.5,
    description: 'Stunning Banarasi brocade kurti set with interwoven golden motifs on rich silk-textured fabric. This festive three-piece set comes with matching palazzo and dupatta, making it ideal for Diwali, Eid, Navratri and family functions. The rich texture and deep jewel tones make it a premium choice for women who love designer ethnic wear.',
    badge: 'Trending'
  },
  {
    id: '5',
    slug: 'handblock-print-kurti',
    name: 'Handblock Print Kurti',
    category: 'Kurtis',
    price: 1799,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=600&q=75',
    rating: 4.4,
    description: 'Handcrafted cotton kurti featuring authentic Rajasthani block printing using natural dyes on breathable pure cotton fabric. Perfect for daily office wear, college and casual outings — skin-friendly and comfortable throughout the day. Machine washable and pre-shrunk. Pairs effortlessly with leggings, palazzos or denim for a versatile everyday ethnic look.',
    badge: 'Top Rated'
  },
  {
    id: '6',
    slug: 'embroidered-silk-kurti',
    name: 'Embroidered Silk Kurti',
    category: 'Kurtis',
    price: 2199,
    discount: '20% off',
    image: 'https://images.unsplash.com/photo-1520975694503-02d3c490dbe8?auto=format&fit=crop&w=600&q=75',
    rating: 4.6,
    description: 'Luxurious silk kurti adorned with intricate hand-embroidered floral and geometric patterns in contrasting thread work. Ideal for festive occasions, family events and cultural programmes. The straight-cut silhouette with side slits makes it both elegant and comfortable for all-day wear. Pairs beautifully with churidar, palazzo or a silk dupatta.',
    badge: 'Popular'
  },
  {
    id: '7',
    slug: 'mysore-silk-saree',
    name: 'Mysore Silk Saree',
    category: 'Sarees',
    price: 4799,
    discount: '28% off',
    image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?auto=format&fit=crop&w=600&q=75',
    rating: 4.9,
    description: 'Genuine Mysore silk saree with its characteristic satin-smooth texture, subtle sheen and a graceful fall. Featuring a rich pallu with woven floral motifs, this saree reflects Karnataka\'s celebrated weaving heritage. A preferred choice for housewarmings, temple visits, formal functions and South Indian weddings. Lightweight enough for all-day comfort.',
    badge: 'Editor Pick'
  },
  {
    id: '8',
    slug: 'printed-georgette-saree',
    name: 'Printed Georgette Saree',
    category: 'Sarees',
    price: 2399,
    discount: '33% off',
    image: 'https://images.unsplash.com/photo-1522136911466-8c1657e5098d?auto=format&fit=crop&w=600&q=75',
    rating: 4.7,
    description: 'Contemporary georgette saree in bold digital prints designed for the modern Indian woman who loves vibrant ethnic wear. The flowy georgette fabric drapes beautifully without effort — ideal for parties, outdoor ceremonies and sangeet nights. Available in rich festive colours with an unstitched blouse piece included.',
    badge: 'Family Favourite'
  },
  {
    id: '9',
    slug: 'partywear-kurti-gown',
    name: 'Partywear Kurti Gown',
    category: 'Kurtis',
    price: 2999,
    discount: '22% off',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=75',
    rating: 4.8,
    description: 'Elegant floor-length kurti gown in soft poly-silk fabric with subtle embellishments and flared bell sleeves. A stunning choice for mehndi ceremonies, reception parties and festive celebrations where you want to make a statement. The relaxed floor-length silhouette ensures comfort throughout the event. Pair with oxidised jhumkas for a complete look.',
    badge: 'Back to Office'
  },
  {
    id: '10',
    slug: 'silk-blend-kurti',
    name: 'Silk Blend Kurti',
    category: 'Kurtis',
    price: 1999,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1566753323558-f4e73543a495?auto=format&fit=crop&w=600&q=75',
    rating: 4.3,
    description: 'Versatile silk-blend kurti with a refined modern A-line cut featuring subtle floral embroidery at the neckline and hem. Flatters all body types and works beautifully for both office ethnic days and festive outings. Easy-care fabric that retains its shape and sheen even after multiple washes. A must-have addition to your ethnic wear collection.',
    badge: 'Deal'
  },
  {
    id: '11',
    slug: 'kanjivaram-silk-saree',
    name: 'Kanjivaram Silk Saree',
    category: 'Sarees',
    price: 6299,
    discount: '27% off',
    image: 'https://images.unsplash.com/photo-1520972451188-933c5e89f5b4?auto=format&fit=crop&w=600&q=75',
    rating: 4.8,
    description: 'Authentic Kanjivaram silk saree — South India\'s most celebrated weaving tradition — in heavyweight pure mulberry silk with a contrasting border and detailed woven zari motifs. Every Kanjivaram saree takes days to weave on traditional handlooms in Tamil Nadu. A prized heirloom saree ideal for weddings, temple ceremonies and grand celebrations. A truly timeless ethnic wear investment.',
    badge: 'Premium'
  },
  {
    id: '12',
    slug: 'anna-salwar-kurti',
    name: 'Anna Salwar Kurti',
    category: 'Kurtis',
    price: 1699,
    discount: '35% off',
    image: 'https://images.unsplash.com/photo-1614251055880-b72b89ff2db3?auto=format&fit=crop&w=600&q=75',
    rating: 4.5,
    description: 'Classic salwar kameez set in breathable cotton fabric with soft pastel prints and matching bottoms. A timeless Indian ethnic outfit suitable for daily wear, office, college and casual outings. The relaxed fit and lightweight material ensure all-day comfort in all seasons. Includes full set with kurta and salwar with care instructions.',
    badge: 'Limited Stock'
  },
  {
    id: '13',
    slug: 'kundan-necklace-set',
    name: 'Kundan Necklace Set',
    category: 'Artificial Jewellery',
    price: 3499,
    discount: '20% off',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=75',
    rating: 4.8,
    description: 'Exquisite handcrafted Kundan necklace set featuring traditional uncut stone work set in gold-plated brass with a matching pair of drop earrings with dangling pearls and coloured meenakari stones. This bridal Kundan jewellery set is perfect for weddings, sangeet, receptions and festival wear. Pairs beautifully with silk sarees, Banarasi drapes and lehengas.',
    badge: 'Best Seller'
  },
  {
    id: '14',
    slug: 'temple-gold-earrings',
    name: 'Temple Gold Earrings',
    category: 'Artificial Jewellery',
    price: 1299,
    discount: '15% off',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=75',
    rating: 4.7,
    description: 'Authentic South Indian temple jewellery earrings with intricate peacock and deity motifs in gold-plated brass. These long drop earrings complement Kanjivaram silk sarees, Mysore silk drapes and traditional festive ethnic wear. Lightweight and comfortable for all-day wear at ceremonies and pujas. A beautiful gifting option for women who love traditional jewellery.',
    badge: 'New'
  },
  {
    id: '15',
    slug: 'lac-bangle-set',
    name: 'Lac Bangle Set',
    category: 'Artificial Jewellery',
    price: 899,
    discount: '25% off',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=75',
    rating: 4.5,
    description: 'Handcrafted Rajasthani lac bangles in vivid festive colours, adorned with traditional mirrors, beads and zardosi work. Sold as a set of 12 bangles — perfect for bridal chooda, mehndi ceremonies, Navratri garba and Teej celebrations. The centuries-old lac-making craft of Rajasthan ensures each bangle is uniquely detailed. Available in red, pink, green and multi-colour bridal sets.',
    badge: 'Trending'
  },
  {
    id: '16',
    slug: 'polki-diamond-maang-tikka',
    name: 'Polki Diamond Maang Tikka',
    category: 'Artificial Jewellery',
    price: 2199,
    discount: '18% off',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88552?auto=format&fit=crop&w=600&q=75',
    rating: 4.9,
    description: 'Elegant Polki-inspired maang tikka featuring clusters of uncut stones in a gold-plated setting with delicate pearl drops and a long adjustable chain. This bridal maang tikka elevates any ethnic look, pairing perfectly with Kundan necklace sets and silk sarees for weddings and receptions. The adjustable chain fits all head sizes comfortably.',
    badge: 'Premium'
  },
  {
    id: '17',
    slug: 'oxidised-silver-jhumkas',
    name: 'Oxidised Silver Jhumkas',
    category: 'Artificial Jewellery',
    price: 749,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1630018548696-e22d66d62cde?auto=format&fit=crop&w=600&q=75',
    rating: 4.6,
    description: 'Handmade oxidised silver jhumka earrings in a traditional bell shape with intricate floral and paisley patterns. These lightweight jhumkas are perfect for everyday ethnic wear, college, office and casual outings. The anti-tarnish oxidised finish ensures lasting wear through daily use. Pairs beautifully with cotton kurtis, salwar sets and casual chiffon sarees.',
    badge: 'Top Rated'
  },
  {
    id: '18',
    slug: 'jadau-choker-necklace',
    name: 'Jadau Choker Necklace',
    category: 'Artificial Jewellery',
    price: 4299,
    discount: '22% off',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=75',
    rating: 4.8,
    description: 'Opulent Jadau choker necklace in the royal Rajputana tradition, set with simulated emerald and ruby stones in 24K gold-plated brass using the centuries-old Jadau inlay technique. Ideal for bridal jewellery at weddings and grand receptions. Pairs magnificently with traditional lehenga choli, Banarasi sarees and anarkali sets for a regal ethnic look.',
    badge: 'Editor Pick'
  },
  {
    id: '19',
    slug: 'chanderi-silk-kurti-set',
    name: 'Chanderi Silk Kurti Set',
    category: 'Kurtis',
    price: 2399,
    discount: '28% off',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=75',
    rating: 4.6,
    description: 'Exquisite Chanderi silk kurti set from the renowned handwoven tradition of Madhya Pradesh. The sheer, lightweight Chanderi fabric with its signature gold tissue weave breathes beautifully in warm weather while looking luxurious at festive events. Features delicate block-print motifs with a straight-cut silhouette. Includes a matching Chanderi dupatta.',
    badge: 'New'
  }
];
