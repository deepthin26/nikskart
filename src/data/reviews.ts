export interface ProductReview {
  author: string;
  location: string;
  datePublished: string;
  reviewBody: string;
  ratingValue: number;
}

const sareeReviews: ProductReview[] = [
  { author: 'Priya Sharma', location: 'Mumbai', datePublished: '2026-04-12', reviewBody: 'Absolutely stunning saree! The fabric quality is excellent and the colour is exactly as shown in the photo. Wore it to my cousin\'s wedding and received so many compliments. Packaging was also very neat.', ratingValue: 5 },
  { author: 'Anjali Rao', location: 'Bengaluru', datePublished: '2026-03-25', reviewBody: 'Beautiful drape and very soft fabric. Delivery was quick. The blouse piece is also good quality. Would definitely recommend Nikskart to my friends.', ratingValue: 5 },
  { author: 'Deepa Menon', location: 'Chennai', datePublished: '2026-05-02', reviewBody: 'Good quality for the price. The zari work is detailed and the saree drapes very well. Colour was slightly brighter than in the photo but still lovely.', ratingValue: 4 },
];

const kurtiReviews: ProductReview[] = [
  { author: 'Meena Krishnan', location: 'Hyderabad', datePublished: '2026-04-20', reviewBody: 'The fabric is so soft and comfortable for daily wear! The print is vibrant and the stitching is neat. Fits perfectly as per the size chart. Already ordered two more kurtis.', ratingValue: 5 },
  { author: 'Rekha Patel', location: 'Ahmedabad', datePublished: '2026-03-14', reviewBody: 'Love the print and the quality of the cotton. Looks even better in person than in the photos. Delivery was fast. Very happy with this purchase.', ratingValue: 5 },
  { author: 'Sunita Verma', location: 'Delhi', datePublished: '2026-05-10', reviewBody: 'Nice kurti, good material. Sizing is slightly generous so I would suggest ordering one size down. Otherwise the quality and print are excellent.', ratingValue: 4 },
];

const jewelleryReviews: ProductReview[] = [
  { author: 'Divya Nair', location: 'Kochi', datePublished: '2026-04-08', reviewBody: 'Beautifully crafted jewellery! Looks exactly like the photos and the finish is very premium. Wore it for a family function and everyone asked where I bought it. Great value for money.', ratingValue: 5 },
  { author: 'Kavitha Iyer', location: 'Coimbatore', datePublished: '2026-03-30', reviewBody: 'Excellent quality for artificial jewellery. Bought this for my sister\'s engagement and it looked gorgeous with her lehenga. Very happy with the purchase and fast delivery.', ratingValue: 5 },
  { author: 'Pooja Gupta', location: 'Jaipur', datePublished: '2026-05-18', reviewBody: 'The craftsmanship is very good and the stones look real. It is lightweight and comfortable to wear for long events. Will definitely buy more jewellery from Nikskart.', ratingValue: 5 },
];

const poolMap: Record<string, ProductReview[]> = {
  Sarees: sareeReviews,
  Kurtis: kurtiReviews,
  'Artificial Jewellery': jewelleryReviews,
};

export function getProductReviews(category: string, productId: string): ProductReview[] {
  const pool = poolMap[category] ?? sareeReviews;
  const offset = parseInt(productId, 10) % pool.length;
  return [
    pool[offset % pool.length],
    pool[(offset + 1) % pool.length],
  ];
}
