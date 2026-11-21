// Gold line icons in the Nikskart style (used instead of colourful emoji).
// They inherit `color`, so the surrounding CSS decides gold / black / white.
export type BrandIconName =
  | 'drop' | 'sparkle' | 'return' | 'lock' | 'leaf' | 'gift' | 'gem' | 'shield'
  | 'home' | 'watch' | 'bag' | 'user' | 'phone' | 'chat' | 'mail' | 'clock'
  | 'card' | 'bank' | 'upi' | 'truck' | 'box' | 'check' | 'close' | 'star' | 'heart' | 'search';

const paths: Record<BrandIconName, JSX.Element> = {
  drop: <path d="M12 3.5c3.2 4 5.5 7.1 5.5 10a5.5 5.5 0 0 1-11 0c0-2.9 2.3-6 5.5-10z" />,
  sparkle: (
    <>
      <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" />
      <path d="M18.5 15.5c.2 1.4.8 2 2.2 2.2-1.4.2-2 .8-2.2 2.2-.2-1.4-.8-2-2.2-2.2 1.4-.2 2-.8 2.2-2.2z" />
    </>
  ),
  return: (<><path d="M4 9h11a5 5 0 0 1 0 10H8" /><path d="M8 5 4 9l4 4" /></>),
  lock: (<><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /><path d="M12 14.5v2.5" /></>),
  leaf: (<><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" /><path d="M5 19c3-4 6-6.5 9-8" /></>),
  gift: (<><rect x="4" y="9" width="16" height="11" rx="1.5" /><path d="M3.5 9h17M12 9v11" /><path d="M12 9c-1-3.5-5-4.5-5-2s3.5 2 5 2zM12 9c1-3.5 5-4.5 5-2s-3.5 2-5 2z" /></>),
  gem: (<><path d="M6 4h12l3 5-9 11L3 9z" /><path d="M3 9h18M9 4l3 16 3-16" /></>),
  shield: (<><path d="M12 3 5 6v5.5c0 4.3 3 7.9 7 9.5 4-1.6 7-5.2 7-9.5V6z" /><path d="m9 12 2.2 2.2L15.5 10" /></>),
  home: (<><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" /></>),
  watch: (<><circle cx="12" cy="12" r="5.5" /><path d="M12 9.5V12l1.6 1.2" /><path d="M9 7l.7-3.5h4.6L15 7M9 17l.7 3.5h4.6L15 17" /></>),
  bag: (<><path d="M5 8h14l-1 12.5H6z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>),
  user: (<><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20.5c1-3.8 4-5.8 7.5-5.8s6.5 2 7.5 5.8" /></>),
  phone: <path d="M6.5 3.5h3l1.5 4.2-2 1.3a11 11 0 0 0 6 6l1.3-2 4.2 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />,
  chat: (<><path d="M4 18.5 5.3 15A7.5 7.5 0 1 1 9 18.6z" /><path d="M9 10.5h6M9 13.5h4" /></>),
  mail: (<><rect x="3.5" y="5.5" width="17" height="13" rx="1.5" /><path d="m4 6.5 8 6.5 8-6.5" /></>),
  clock: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>),
  card: (<><rect x="3" y="6" width="18" height="12.5" rx="1.8" /><path d="M3 10h18M6.5 15h4" /></>),
  bank: (<><path d="M3.5 9 12 4l8.5 5z" /><path d="M5.5 9.5v7.5M10 9.5v7.5M14 9.5v7.5M18.5 9.5v7.5M3.5 20h17" /></>),
  upi: (<><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M10.5 17.5h3" /><path d="m10.5 8 2.5 2.5-2.5 2.5" /></>),
  truck: (<><path d="M3 6.5h11v9.5H3zM14 10h3.8l2.7 3v3H14" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>),
  box: (<><path d="M12 3 20 7.2v9.6L12 21l-8-4.2V7.2z" /><path d="M4 7.2 12 11.5l8-4.3M12 11.5V21" /></>),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  star: <path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" />,
  search: (<><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z" />,
};

export default function BrandIcon({ name, size = 26, className = '' }: { name: BrandIconName; size?: number; className?: string }) {
  return (
    <svg className={`brand-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
