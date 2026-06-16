import { useEffect } from 'react';

export function useSeoMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    return () => {
      document.title = 'Nikskart – Ethnic Sarees, Kurtis & Jewellery Online Shopping';
    };
  }, [title, description]);
}
