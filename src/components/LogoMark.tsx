// Nikskart logo mark: one gold circle that reads as both a RING (solitaire
// diamond on top) and a WATCH (hour marks around the dial), with the N inside.
export default function LogoMark({ size = 42, className = '' }: { size?: number; className?: string }) {
  const id = `nkGold${size}`;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="8" y1="4" x2="32" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f6e4bb" />
          <stop offset="0.5" stopColor="#d1ad72" />
          <stop offset="1" stopColor="#a07d45" />
        </linearGradient>
      </defs>
      {/* black dial */}
      <circle cx="20" cy="20" r="18.6" fill="#0a0a0a" />
      {/* gold band — reads as both a ring and a watch bezel */}
      <circle cx="20" cy="21" r="17.2" stroke={`url(#${id})`} strokeWidth="1.6" />
      {/* watch hour marks */}
      <path d="M26.95 7.96L27.60 6.84M32.04 13.05L33.16 12.40M33.00 20.00L35.20 20.00M32.04 26.95L33.16 27.60M26.95 32.04L27.60 33.16M20.00 33.00L20.00 35.20M13.05 32.04L12.40 33.16M7.96 26.95L6.84 27.60M7.00 20.00L4.80 20.00M7.96 13.05L6.84 12.40M13.05 7.96L12.40 6.84" stroke={`url(#${id})`} strokeWidth="0.9" strokeLinecap="round" />
      {/* the N */}
      <text x="20" y="28.4" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="17" fontWeight="700" fill={`url(#${id})`}>N</text>
      {/* solitaire diamond set on the band at 12 o'clock — like a ring's stone */}
      <path d="M15.6 3.9l1.9-2.6h5l1.9 2.6-4.4 4.9z" fill={`url(#${id})`} stroke="#0a0a0a" strokeWidth="0.5" strokeLinejoin="round" />
      <path d="M15.6 3.9h8.8M17.5 1.3l2.5 7.5 2.5-7.5M20 1.3l-1.3 2.6M20 1.3l1.3 2.6" stroke="#0a0a0a" strokeWidth="0.45" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// Wordmark: "Nikskart" with the dot of the i replaced by a gold diamond.
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <strong className={`nk-wordmark ${className}`} aria-label="Nikskart">
      N<span className="nk-gem-i">ı</span>kskart
    </strong>
  );
}
