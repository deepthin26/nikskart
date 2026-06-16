import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
const AdminDashboard  = lazy(() => import('./pages/AdminDashboard'));

function PageLoader() {
  return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a46e' }}>Loading…</div>;
}

function App() {
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
          <Route path="/product/:productId" element={<ProductDetail cart={cart} wishlist={wishlist} />} />
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
