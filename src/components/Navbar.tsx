import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoMark, { Wordmark } from './LogoMark';
import { CATEGORY_LIST, GROUPS, categoryPath } from '../data/categories';

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

// Dropdown menus: Women / Men / Watches (categories come from src/data/categories.ts)
const menus = GROUPS.map((g) => ({
  key: g.key,
  label: g.label,
  allTo: categoryPath(g.slug),
  items: CATEGORY_LIST.filter((c) => c.group === g.key).map((c) => ({ label: c.label, to: categoryPath(c.slug) })),
}));

const quickLinks = [
  { label: 'Anti-Tarnish', to: categoryPath('anti-tarnish') },
  { label: 'Best Sellers', to: categoryPath('best-sellers') },
];

export default function Navbar({ cartCount, wishlistCount, user, onLogout }: NavbarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLElement>(null);

  // Close desktop dropdown when tapping outside on mobile
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
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
    setMobileMenuOpen(null);
    setOpenMenu(null);
  };

  return (
    <>
      <header className="navbar">
        <div className="brand-bar">
          <Link className="brand" to="/" onClick={closeAll}>
            <LogoMark className="brand-logo-svg" size={42} />
            <div className="brand-text">
              <Wordmark />
              <span className="brand-tagline">Jewellery &amp; Watches</span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="nav-links" ref={dropdownRef}>
            <Link to="/">Home</Link>

            {menus.map((m) => m.items.length === 1 ? (
              <Link key={m.key} to={m.items[0].to}>{m.label}</Link>
            ) : (
              <div
                key={m.key}
                className="nav-dropdown"
                onMouseEnter={() => setOpenMenu(m.key)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className="nav-dropdown-trigger"
                  onClick={() => setOpenMenu((v) => (v === m.key ? null : m.key))}
                  aria-expanded={openMenu === m.key}
                  aria-haspopup="true"
                >
                  {m.label} <span className={`dropdown-chevron${openMenu === m.key ? ' open' : ''}`}>▾</span>
                </button>
                {openMenu === m.key && (
                  <div className="dropdown-menu">
                    <Link to={m.allTo} className="dropdown-all" onClick={() => setOpenMenu(null)}>
                      Shop all {m.label}
                    </Link>
                    {m.items.map((cat) => (
                      <Link key={cat.to} to={cat.to} onClick={() => setOpenMenu(null)}>
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {quickLinks.map((q) => (
              <Link key={q.to} to={q.to}>{q.label}</Link>
            ))}
            {user.authenticated && <Link to="/orders">My Orders</Link>}
            {user.authenticated && <Link to="/account">My Account</Link>}
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

              {menus.map((m) => m.items.length === 1 ? (
                <Link key={m.key} to={m.items[0].to} className="mobile-nav-link" onClick={closeAll}>{m.label}</Link>
              ) : (
                <div key={m.key}>
                  <button
                    className="mobile-nav-link mobile-nav-accordion"
                    onClick={() => setMobileMenuOpen((v) => (v === m.key ? null : m.key))}
                  >
                    {m.label}
                    <span className={`dropdown-chevron${mobileMenuOpen === m.key ? ' open' : ''}`}>▾</span>
                  </button>
                  {mobileMenuOpen === m.key && (
                    <div className="mobile-nav-sub">
                      <Link to={m.allTo} className="mobile-nav-sub-link" onClick={closeAll}>Shop all {m.label}</Link>
                      {m.items.map((cat) => (
                        <Link key={cat.to} to={cat.to} className="mobile-nav-sub-link" onClick={closeAll}>
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {quickLinks.map((q) => (
                <Link key={q.to} to={q.to} className="mobile-nav-link" onClick={closeAll}>{q.label}</Link>
              ))}

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
