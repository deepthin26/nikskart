import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (email: string, password: string) => boolean;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onLogin(email, password)) {
      setError('Please enter a valid email and password.');
      return;
    }
    navigate('/checkout');
  };

  return (
    <main className="page-content auth-page">
      <div className="auth-panel">
        <h1>Sign in to Nikskart</h1>
        <p>Use your email and password to continue shopping with confidence.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="primary-button">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
