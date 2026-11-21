// Nikskart logo mark: a gold sparkle inside a fine gold ring on black.
export default function LogoMark({ size = 42, className = '' }: { size?: number; className?: string }) {
  const id = `nkGold${size}`;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f1dcae" />
          <stop offset="0.5" stopColor="#c9a46e" />
          <stop offset="1" stopColor="#9c7a45" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19.25" fill="#0a0a0a" />
      <circle cx="20" cy="20" r="16" stroke={`url(#${id})`} strokeWidth="0.9" />
      <path d="M20 8.5C20.9 15.6 24.4 19.1 31.5 20C24.4 20.9 20.9 24.4 20 31.5C19.1 24.4 15.6 20.9 8.5 20C15.6 19.1 19.1 15.6 20 8.5Z" fill={`url(#${id})`} />
      <path d="M28.6 9.4C28.8 10.9 29.6 11.7 31.1 11.9C29.6 12.1 28.8 12.9 28.6 14.4C28.4 12.9 27.6 12.1 26.1 11.9C27.6 11.7 28.4 10.9 28.6 9.4Z" fill="#f1dcae" />
    </svg>
  );
}
