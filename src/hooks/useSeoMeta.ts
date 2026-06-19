import { useEffect } from 'react';

export function useSeoMeta(title: string, description: string, noindex = false) {
  useEffect(() => {
    document.title = title;

    const setMeta = (sel: string, val: string) =>
      document.querySelector(sel)?.setAttribute('content', val);
    const setLink = (sel: string, val: string) =>
      document.querySelector(sel)?.setAttribute('href', val);

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', window.location.href);
    setLink('link[rel="canonical"]', window.location.href);

    // noindex for private/transactional pages
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    }

    return () => {
      document.title = 'Nikskart – Ethnic Sarees, Kurtis & Jewellery Online Shopping';
      setMeta('meta[property="og:url"]', 'https://www.nikskart.com/');
      setLink('link[rel="canonical"]', 'https://www.nikskart.com/');
      if (noindex) setMeta('meta[name="robots"]', 'index, follow');
    };
  }, [title, description, noindex]);
}
