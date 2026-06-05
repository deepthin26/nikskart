import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';
import { useOrders } from './hooks/useOrders';
import { useWishlist } from './hooks/useWishlist';

function App() {
  const cart = useCart();
  const auth = useAuth();
  const orders = useOrders(auth.user.authenticated ? auth.user.email : null, auth.user.name);
  const wishlist = useWishlist();

  return (
    <div className="app-shell">
      <Navbar
        cartCount={cart.totalCount}
        wishlistCount={wishlist.count}
        user={auth.user}
        onLogout={auth.logout}
      />
      <Routes>
        <Route path="/" element={<Home cart={cart} wishlist={wishlist} />} />
        <Route path="/product/:productId" element={<ProductDetail cart={cart} wishlist={wishlist} />} />
        <Route path="/cart" element={<Cart cart={cart} wishlist={wishlist} />} />
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} cart={cart} />} />
        <Route
          path="/login"
          element={<Login onLogin={auth.login} onSignup={auth.signup} />}
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              user={auth.user}
              addAddress={auth.addAddress}
              selectAddress={auth.selectAddress}
              addOrder={orders.addOrder}
              clearCart={cart.clearCart}
            />
          }
        />
        <Route path="/orders" element={<Orders orders={orders.orders} user={auth.user} />} />
        <Route
          path="/account"
          element={
            <Account
              user={auth.user}
              addAddress={auth.addAddress}
              selectAddress={auth.selectAddress}
              removeAddress={auth.removeAddress}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
