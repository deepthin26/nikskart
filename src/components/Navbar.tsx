import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  user: {
    authenticated: boolean;
    name: string;
    email: string;
  };
  onLogout: () => void;
}

const womenCategories = [
  { label: 'Sarees', to: '/sarees' },
  { label: 'Kurtis', to: '/kurtis' },
  { label: 'Artificial Jewellery', to: '/artificial-jewellery' },
];

export default function Navbar({ cartCount, wishlistCount, user, onLogout }: NavbarProps) {
  const [womenOpen, setWomenOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWomenOpen, setMobileWomenOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown when tapping outside on mobile
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setWomenOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setMobileWomenOpen(false);
    setWomenOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="brand-bar">
          <Link className="brand" to="/" onClick={closeAll}>
            <svg className="brand-logo-svg" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="42" height="42" rx="4" fill="#0a0a0a"/>
              <rect x="1" y="1" width="42" height="42" rx="4" stroke="#c9a46e" strokeWidth="1.5"/>
              <line x1="7" y1="7.5" x2="37" y2="7.5" stroke="#c9a46e" strokeWidth="0.7" strokeOpacity="0.55"/>
              <line x1="7" y1="36.5" x2="37" y2="36.5" stroke="#c9a46e" strokeWidth="0.7" strokeOpacity="0.55"/>
              <rect x="5.5" y="5.5" width="3" height="3" rx="0.5" fill="#c9a46e" opacity="0.8" transform="rotate(45 7 7)"/>
              <rect x="34.5" y="5.5" width="3" height="3" rx="0.5" fill="#c9a46e" opacity="0.8" transform="rotate(45 36 7)"/>
              <rect x="5.5" y="34.5" width="3" height="3" rx="0.5" fill="#c9a46e" opacity="0.8" transform="rotate(45 7 36)"/>
              <rect x="34.5" y="34.5" width="3" height="3" rx="0.5" fill="#c9a46e" opacity="0.8" transform="rotate(45 36 36)"/>
              <text x="22" y="29" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="700" fill="#c9a46e" textAnchor="middle">N</text>
            </svg>
            <div className="brand-text">
              <strong>Nikskart</strong>
              <span className="brand-tagline">Ethnic Fashion</span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="nav-links">
            <Link to="/">Home</Link>

            <div
              className="nav-dropdown"
              ref={dropdownRef}
              onMouseEnter={() => setWomenOpen(true)}
              onMouseLeave={() => setWomenOpen(false)}
            >
              <button
                className="nav-dropdown-trigger"
                onClick={() => setWomenOpen((v) => !v)}
                aria-expanded={womenOpen}
                aria-haspopup="true"
              >
                Women <span className={`dropdown-chevron${womenOpen ? ' open' : ''}`}>▾</span>
              </button>
              {womenOpen && (
                <div className="dropdown-menu">
                  {womenCategories.map((cat) => (
                    <Link key={cat.to} to={cat.to} onClick={() => setWomenOpen(false)}>
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/cart">Cart</Link>
            {user.authenticated && <Link to="/orders">My Orders</Link>}
            {user.authenticated && <Link to="/account">My Account</Link>}
            <Link to="/checkout">Checkout</Link>
            {user.authenticated && <Link to="/admin">Admin</Link>}
          </nav>

          {/* ── Desktop actions ── */}
          <div className="navbar-actions">
            {user.authenticated ? (
              <>
                <span className="user-pill">Hi, {user.name}</span>
                <button className="nav-logout" onClick={onLogout}>Logout</button>
              </>
            ) : (
              <Link className="nav-login" to="/login">Login</Link>
            )}
            <Link className="wishlist-button" to="/wishlist">
              Wishlist <span className="cart-count">{wishlistCount}</span>
            </Link>
            <Link className="cart-button" to="/cart">
              Bag <span className="cart-count">{cartCount}</span>
            </Link>
          </div>

          {/* ── Mobile: Bag + Hamburger ── */}
          <div className="mobile-nav-actions">
            <Link className="cart-button" to="/cart" onClick={closeAll}>
              Bag <span className="cart-count">{cartCount}</span>
            </Link>
            <button
              className="hamburger-btn"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className={mobileOpen ? 'is-open' : ''} />
              <span className={mobileOpen ? 'is-open' : ''} />
              <span className={mobileOpen ? 'is-open' : ''} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <>
          <div className="mobile-nav-backdrop" onClick={closeAll} />
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <div className="mobile-nav-header">
              <span className="mobile-nav-brand">Nikskart</span>
              <button className="mobile-nav-close" onClick={closeAll} aria-label="Close menu">✕</button>
            </div>

            <div className="mobile-nav-body">
              <Link to="/" className="mobile-nav-link" onClick={closeAll}>Home</Link>

              {/* Women accordion */}
              <button
                className="mobile-nav-link mobile-nav-accordion"
                onClick={() => setMobileWomenOpen((v) => !v)}
              >
                Women
                <span className={`dropdown-chevron${mobileWomenOpen ? ' open' : ''}`}>▾</span>
              </button>
              {mobileWomenOpen && (
                <div className="mobile-nav-sub">
                  {womenCategories.map((cat) => (
                    <Link key={cat.to} to={cat.to} className="mobile-nav-sub-link" onClick={closeAll}>
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link to="/wishlist" className="mobile-nav-link" onClick={closeAll}>
                Wishlist{wishlistCount > 0 && <span className="cart-count">{wishlistCount}</span>}
              </Link>
              {user.authenticated && <Link to="/orders" className="mobile-nav-link" onClick={closeAll}>My Orders</Link>}
              {user.authenticated && <Link to="/account" className="mobile-nav-link" onClick={closeAll}>My Account</Link>}
              <Link to="/checkout" className="mobile-nav-link" onClick={closeAll}>Checkout</Link>
              {user.authenticated && <Link to="/admin" className="mobile-nav-link" onClick={closeAll}>Admin</Link>}

              <div className="mobile-nav-divider" />

              {user.authenticated ? (
                <>
                  <span className="mobile-nav-user">Hi, {user.name}</span>
                  <button
                    className="mobile-nav-link mobile-nav-logout"
                    onClick={() => { onLogout(); closeAll(); }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="mobile-nav-link mobile-nav-cta" onClick={closeAll}>
                  Login / Sign Up
                </Link>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
