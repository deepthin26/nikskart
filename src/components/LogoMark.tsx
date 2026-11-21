// Nikskart logo mark: a clear gold "N" in the brand font with a small
// diamond accent above, inside a fine gold ring on black.
export default function LogoMark({ size = 42, className = '' }: { size?: number; className?: string }) {
  const id = `nkGold${size}`;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f6e4bb" />
          <stop offset="0.5" stopColor="#d1ad72" />
          <stop offset="1" stopColor="#a07d45" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19.5" fill="#0a0a0a" />
      <circle cx="20" cy="20" r="16.8" stroke={`url(#${id})`} strokeWidth="0.9" />
      {/* clear N in the brand font */}
      <text x="20" y="29.8" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="700" fill={`url(#${id})`}>N</text>
      {/* small diamond accent */}
      <path d="M17.7 7.6l.85-1.3h2.9l.85 1.3-2.3 2.6z" fill={`url(#${id})`} />
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
