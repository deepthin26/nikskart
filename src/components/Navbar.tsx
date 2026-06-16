import { useState } from 'react';
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
  { label: 'Sarees', value: 'Sarees' },
  { label: 'Kurtis', value: 'Kurtis' },
  { label: 'Artificial Jewellery', value: 'Artificial Jewellery' },
];

export default function Navbar({ cartCount, wishlistCount, user, onLogout }: NavbarProps) {
  const [womenOpen, setWomenOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="brand-bar">
          <Link className="brand" to="/">
            <svg className="brand-logo-svg" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="42" height="42" rx="4" fill="#0a0a0a"/>
              <rect x="1" y="1" width="42" height="42" rx="4" stroke="#c9a46e" strokeWidth="1.5"/>
              {/* decorative inner lines */}
              <line x1="7" y1="7.5" x2="37" y2="7.5" stroke="#c9a46e" strokeWidth="0.7" strokeOpacity="0.55"/>
              <line x1="7" y1="36.5" x2="37" y2="36.5" stroke="#c9a46e" strokeWidth="0.7" strokeOpacity="0.55"/>
              {/* corner diamonds */}
              <rect x="5.5" y="5.5" width="3" height="3" rx="0.5" fill="#c9a46e" opacity="0.8" transform="rotate(45 7 7)"/>
              <rect x="34.5" y="5.5" width="3" height="3" rx="0.5" fill="#c9a46e" opacity="0.8" transform="rotate(45 36 7)"/>
              <rect x="5.5" y="34.5" width="3" height="3" rx="0.5" fill="#c9a46e" opacity="0.8" transform="rotate(45 7 36)"/>
              <rect x="34.5" y="34.5" width="3" height="3" rx="0.5" fill="#c9a46e" opacity="0.8" transform="rotate(45 36 36)"/>
              {/* N monogram */}
              <text x="22" y="29" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="700" fill="#c9a46e" textAnchor="middle">N</text>
            </svg>
            <div className="brand-text">
              <strong>Nikskart</strong>
              <span className="brand-tagline">Ethnic Fashion</span>
            </div>
          </Link>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <div
              className="nav-dropdown"
              onMouseEnter={() => setWomenOpen(true)}
              onMouseLeave={() => setWomenOpen(false)}
            >
              <button className="nav-dropdown-trigger">
                Women <span className="dropdown-chevron">▾</span>
              </button>
              {womenOpen && (
                <div className="dropdown-menu">
                  {womenCategories.map((cat) => (
                    <Link
                      key={cat.value}
                      to={`/?category=${encodeURIComponent(cat.value)}`}
                      onClick={() => setWomenOpen(false)}
                    >
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
          <div className="navbar-actions">
            {user.authenticated ? (
              <>
                <span className="user-pill">Hi, {user.name}</span>
                <button className="nav-logout" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link className="nav-login" to="/login">
                Login
              </Link>
            )}
            <Link className="wishlist-button" to="/wishlist">
              Wishlist
              <span className="cart-count">{wishlistCount}</span>
            </Link>
            <Link className="cart-button" to="/cart">
              Bag
              <span className="cart-count">{cartCount}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
