import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w = () => window as any;
const fbq = (...args: any[]) => { w().fbq?.(...args); };
const gtag = (...args: any[]) => { w().gtag?.(...args); };

export function usePageTracking() {
  const { pathname } = useLocation();
  useEffect(() => {
    gtag('event', 'page_view', { page_path: pathname, page_location: window.location.href, page_title: document.title });
    fbq('track', 'PageView');
  }, [pathname]);
}

export function trackViewItem(product: { id: string; name: string; category: string; price: number }) {
  fbq('track', 'ViewContent', { content_ids: [product.id], content_name: product.name, content_type: 'product', value: product.price, currency: 'INR' });
  gtag('event', 'view_item', { currency: 'INR', value: product.price, items: [{ item_id: product.id, item_name: product.name, item_category: product.category, price: product.price, quantity: 1 }] });
}

export function trackAddToCart(productName: string, price: number, currency = 'INR') {
  fbq('track', 'AddToCart', { content_name: productName, value: price, currency });
  gtag('event', 'add_to_cart', { currency, value: price, items: [{ item_name: productName, price, quantity: 1 }] });
}

export function trackInitiateCheckout(total: number, numItems: number) {
  fbq('track', 'InitiateCheckout', { value: total, currency: 'INR', num_items: numItems });
  gtag('event', 'begin_checkout', { currency: 'INR', value: total });
}

export function trackPurchase(orderId: string, total: number) {
  fbq('track', 'Purchase', { value: total, currency: 'INR', order_id: orderId });
  gtag('event', 'purchase', { currency: 'INR', value: total, transaction_id: orderId });
}
