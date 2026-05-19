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
    <header className="navbar">
      <div className="brand-bar">
        <Link className="brand" to="/">
          <span className="brand-icon">N</span>
          <div>
            <strong>Nikskart</strong>
            <p>Online Fashion & More</p>
          </div>
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          {user.authenticated && <Link to="/orders">My Orders</Link>}
          {user.authenticated && <Link to="/account">My Account</Link>}
          <Link to="/checkout">Checkout</Link>
           {user.authenticated && <Link to="/dashboard">Dashboard</Link>}
        </nav>
        <div className="navbar-actions">
          {user.authenticated ? (
            <>
              <span className="user-pill">Hi, {user.name}</span>
              <button className="text-button nav-logout" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="text-button nav-login" to="/login">
              Login
            </Link>
          )}
          <Link className="wishlist-button" to="/wishlist">
            <span>Wishlist</span>
            <span className="cart-count">{wishlistCount}</span>
          </Link>
          <Link className="cart-button" to="/cart">
            <span>Cart</span>
            <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
