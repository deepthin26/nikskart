import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { usePageTracking } from './hooks/useAnalytics';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';
import { useOrders } from './hooks/useOrders';
import { useWishlist } from './hooks/useWishlist';

const ProductDetail   = lazy(() => import('./pages/ProductDetail'));
const Cart            = lazy(() => import('./pages/Cart'));
const Login           = lazy(() => import('./pages/Login'));
const Checkout        = lazy(() => import('./pages/Checkout'));
const Orders          = lazy(() => import('./pages/Orders'));
const Wishlist        = lazy(() => import('./pages/Wishlist'));
const Account         = lazy(() => import('./pages/Account'));
const Dashboard       = lazy(() => import('./pages/Dashboard'));
const AdminDashboard       = lazy(() => import('./pages/AdminDashboard'));
const Contact              = lazy(() => import('./pages/Contact'));
const Sarees               = lazy(() => import('./pages/Sarees'));
const Kurtis               = lazy(() => import('./pages/Kurtis'));
const ArtificialJewellery  = lazy(() => import('./pages/ArtificialJewellery'));
const JewelleryCollection  = lazy(() => import('./pages/JewelleryCollection'));
const About                = lazy(() => import('./pages/About'));
const ShippingPolicy       = lazy(() => import('./pages/ShippingPolicy'));
const Returns              = lazy(() => import('./pages/Returns'));
const SizeGuide            = lazy(() => import('./pages/SizeGuide'));
const PrivacyPolicy        = lazy(() => import('./pages/PrivacyPolicy'));
const Terms                = lazy(() => import('./pages/Terms'));

function PageLoader() {
  return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a46e' }}>Loading…</div>;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 450);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

function MobileBottomNav({ cartCount }: { cartCount: number }) {
  const { pathname } = useLocation();
  const nav = [
    { to: '/',        icon: '🏠', label: 'Home' },
    { to: '/sarees',  icon: '🥻', label: 'Sarees' },
    { to: '/kurtis',  icon: '👗', label: 'Kurtis' },
    { to: '/cart',    icon: '🛍', label: 'Cart', badge: cartCount },
    { to: '/account', icon: '👤', label: 'Account' },
  ];
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {nav.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`mbn-item${pathname === item.to ? ' active' : ''}`}
        >
          <span className="mbn-icon">
            {item.icon}
            {item.badge ? <span className="mbn-badge">{item.badge}</span> : null}
          </span>
          <span className="mbn-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

function App() {
  usePageTracking();
  const cart    = useCart();
  const auth    = useAuth();
  const orders  = useOrders(auth.user.authenticated ? auth.user.email : null, auth.user.name);
  const wishlist = useWishlist();

  return (
    <div className="app-shell">
      <Navbar
        cartCount={cart.totalCount}
        wishlistCount={wishlist.count}
        user={auth.user}
        onLogout={auth.logout}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home cart={cart} wishlist={wishlist} />} />
          <Route path="/product/:slug" element={<ProductDetail cart={cart} wishlist={wishlist} />} />
          <Route path="/cart" element={<Cart cart={cart} wishlist={wishlist} />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} cart={cart} />} />
          <Route path="/login" element={<Login onLogin={auth.login} onSignup={auth.signup} />} />
          <Route path="/checkout" element={
            <Checkout cart={cart} user={auth.user} addAddress={auth.addAddress}
              selectAddress={auth.selectAddress} addOrder={orders.addOrder} clearCart={cart.clearCart} />
          } />
          <Route path="/orders" element={<Orders orders={orders.orders} user={auth.user} />} />
          <Route path="/account" element={
            <Account user={auth.user} addAddress={auth.addAddress}
              selectAddress={auth.selectAddress} removeAddress={auth.removeAddress} />
          } />
          <Route path="/sarees" element={<Sarees cart={cart} wishlist={wishlist} />} />
          <Route path="/kurtis" element={<Kurtis cart={cart} wishlist={wishlist} />} />
          <Route path="/artificial-jewellery" element={<ArtificialJewellery cart={cart} wishlist={wishlist} />} />
          <Route path="/jewellery-collection" element={<JewelleryCollection cart={cart} wishlist={wishlist} />} />
          <Route path="/about" element={<About />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <MobileBottomNav cartCount={cart.totalCount} />
      <BackToTop />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/918885700227?text=Hi%2C%20I%20have%20a%20query%20about%20Nikskart"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="whatsapp-fab-label">Chat with us</span>
      </a>
    </div>
  );
}

export default App;
