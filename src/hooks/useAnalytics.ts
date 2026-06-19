import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageTracking() {
  const { pathname } = useLocation();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gtag = (window as any).gtag;
    if (typeof gtag !== 'function') return;
    gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);
}
