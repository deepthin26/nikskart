// Nikskart logo mark: a gold "N" whose right stroke is crowned by a faceted
// diamond (like a solitaire ring), with a small sparkle — inside a fine gold ring.
export default function LogoMark({ size = 42, className = '' }: { size?: number; className?: string }) {
  const id = `nkGold${size}`;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f3dfb3" />
          <stop offset="0.5" stopColor="#c9a46e" />
          <stop offset="1" stopColor="#9c7a45" />
        </linearGradient>
      </defs>
      {/* badge */}
      <circle cx="20" cy="20" r="19.25" fill="#0a0a0a" />
      <circle cx="20" cy="20" r="16.2" stroke={`url(#${id})`} strokeWidth="0.8" />
      {/* N: left stem, diagonal, right stem */}
      <path d="M11.6 29.5V12.2h2.4L25.6 26.6V17.2h2.4v12.3h-2.3L14 15.1v14.4z" fill={`url(#${id})`} />
      {/* solitaire diamond on the right stem */}
      <path d="M23.6 12.9l1.5-2.2h3.4l1.5 2.2-3.2 3.6z" fill={`url(#${id})`} />
      <path d="M23.6 12.9h6.4M25.1 10.7l1.7 5.8 1.7-5.8M26.8 10.7v2.2" stroke="#0a0a0a" strokeWidth="0.45" strokeLinejoin="round" />
      {/* sparkle */}
      <path d="M31.6 6.9c.15 1.15.75 1.75 1.9 1.9-1.15.15-1.75.75-1.9 1.9-.15-1.15-.75-1.75-1.9-1.9 1.15-.15 1.75-.75 1.9-1.9z" fill="#f3dfb3" />
    </svg>
  );
}
