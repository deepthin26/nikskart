import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<string | null>;
  onSignup: (email: string, password: string, phone?: string) => Promise<string | null>;
}

export default function Login({ onLogin, onSignup }: LoginProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    if (mode === 'login') {
      const err = await onLogin(email, password);
      setLoading(false);
      if (err) {
        setError(err);
      } else {
        navigate('/');
      }
    } else {
      const err = await onSignup(email, password, phone);
      setLoading(false);
      if (err) {
        setError(err);
      } else {
        setInfo('Account created! You can now sign in.');
        setMode('login');
      }
    }
  };

  return (
    <main className="page-content auth-page">
      <div className="auth-panel">
        <h1>{mode === 'login' ? 'Sign in to Nikskart' : 'Create your account'}</h1>
        <p style={{ color: '#888', fontSize: '0.88rem', marginTop: '0.25rem' }}>
          {mode === 'login'
            ? 'Welcome back. Sign in to continue shopping.'
            : 'Join Nikskart — save addresses, track orders and more.'}
        </p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </label>
          {mode === 'signup' && (
            <label>
              Phone number
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                autoComplete="tel"
              />
            </label>
          )}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'signup' ? 'Min. 6 characters' : 'Enter your password'}
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          {info && <p style={{ color: '#15803d', fontSize: '0.88rem', fontWeight: 500 }}>{info}</p>}
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>
        <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#888', textAlign: 'center' }}>
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button className="text-button" style={{ display: 'inline', padding: 0 }} onClick={() => { setMode('signup'); setError(''); setInfo(''); setPhone(''); }}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button className="text-button" style={{ display: 'inline', padding: 0 }} onClick={() => { setMode('login'); setError(''); setInfo(''); setPhone(''); }}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
