// Gold line icons in the Nikskart style (replace colourful emoji).
export type BrandIconName = 'drop' | 'sparkle' | 'return' | 'lock' | 'leaf' | 'gift' | 'gem';

const paths: Record<BrandIconName, JSX.Element> = {
  drop: <path d="M12 3.5c3.2 4 5.5 7.1 5.5 10a5.5 5.5 0 0 1-11 0c0-2.9 2.3-6 5.5-10z" />,
  sparkle: (
    <>
      <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" />
      <path d="M18.5 15.5c.2 1.4.8 2 2.2 2.2-1.4.2-2 .8-2.2 2.2-.2-1.4-.8-2-2.2-2.2 1.4-.2 2-.8 2.2-2.2z" />
    </>
  ),
  return: (
    <>
      <path d="M4 9h11a5 5 0 0 1 0 10H8" />
      <path d="M8 5 4 9l4 4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <path d="M12 14.5v2.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" />
      <path d="M5 19c3-4 6-6.5 9-8" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M3.5 9h17M12 9v11" />
      <path d="M12 9c-1-3.5-5-4.5-5-2s3.5 2 5 2zM12 9c1-3.5 5-4.5 5-2s-3.5 2-5 2z" />
    </>
  ),
  gem: (
    <>
      <path d="M6 4h12l3 5-9 11L3 9z" />
      <path d="M3 9h18M9 4l3 16 3-16" />
    </>
  ),
};

export default function BrandIcon({ name, size = 26 }: { name: BrandIconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
