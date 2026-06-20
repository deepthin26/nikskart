import { Link } from 'react-router-dom';
import { useSeoMeta } from '../hooks/useSeoMeta';

export default function NotFound() {
  useSeoMeta('Page Not Found – Nikskart', 'The page you are looking for does not exist.', true);
  return (
    <main className="not-found-page">
      <div className="not-found-inner">
        <span className="not-found-code">404</span>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div className="not-found-links">
          <Link to="/" className="primary-button">Back to Home</Link>
          <Link to="/sarees" className="secondary-button">Shop Sarees</Link>
          <Link to="/kurtis" className="secondary-button">Shop Kurtis</Link>
        </div>
      </div>
    </main>
  );
}
