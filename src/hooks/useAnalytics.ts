import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fbq = (...args: any[]) => { if (typeof (window as any).fbq === 'function') (window as any).fbq(...args); };

export function usePageTracking() {
  const { pathname } = useLocation();

  useEffect(() => {
    // GA4
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
    // Meta Pixel SPA page view
    fbq('track', 'PageView');
  }, [pathname]);
}

export function trackAddToCart(productName: string, price: number, currency = 'INR') {
  fbq('track', 'AddToCart', { content_name: productName, value: price, currency });
}

export function trackInitiateCheckout(total: number, numItems: number) {
  fbq('track', 'InitiateCheckout', { value: total, currency: 'INR', num_items: numItems });
}

export function trackPurchase(orderId: string, total: number) {
  fbq('track', 'Purchase', { value: total, currency: 'INR', order_id: orderId });
}
