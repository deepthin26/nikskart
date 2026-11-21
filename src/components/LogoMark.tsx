// Nikskart logo mark: a bold gold "N" whose right stroke is crowned by a
// faceted diamond (like a solitaire ring), inside a fine gold ring on black.
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
      {/* bold N */}
      <path d="M10.6 29.6V11.8h3.4l11.6 13.7V19.2h3.4v10.4h-3.2L14 16v13.6z" fill={`url(#${id})`} />
      {/* solitaire diamond on the right stem */}
      <path d="M22.9 13.3l1.9-2.9h4.6l1.9 2.9-4.2 5.2z" fill={`url(#${id})`} />
      <path d="M22.9 13.3h8.4M24.8 10.4l2.3 8.1 2.3-8.1M27.1 10.4l-1.2 2.9M27.1 10.4l1.2 2.9" stroke="#0a0a0a" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// Wordmark: "nikskart" with the dot of the i replaced by a gold diamond.
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <strong className={`nk-wordmark ${className}`} aria-label="Nikskart">
      n<span className="nk-gem-i">ı</span>kskart
    </strong>
  );
}
