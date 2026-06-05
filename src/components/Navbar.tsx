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

export default function Navbar({ cartCount, wishlistCount, user, onLogout }: NavbarProps) {
  return (
    <>
      <div className="announcement-bar">
        Free shipping on orders above ₹2,999 &nbsp;·&nbsp; Easy 15-day returns &nbsp;·&nbsp; Secure online payments
      </div>
      <header className="navbar">
        <div className="brand-bar">
          <Link className="brand" to="/">
            <span className="brand-icon">N</span>
            <strong>Nikskart</strong>
          </Link>
          <nav className="nav-links">
            <Link to="/">Home</Link>
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
