import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username_or_email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(form);
    if (res.success) {
      navigate(res.user.role === 'admin' ? '/admin' : '/');
    } else {
      setError(res.error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--clr-alabaster)', padding: 'var(--space-6)' }}>
      <div style={{ background: '#FFFFFF', padding: 'var(--space-10)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--clr-gold-border)', width: '100%', maxWidth: 460, boxShadow: 'var(--shadow-xl)' }}>
        <div className="text-center" style={{ marginBottom: 'var(--space-6)' }}>
          <div className="navbar-brand-name" style={{ fontSize: '1.6rem', color: 'var(--clr-emerald)' }}>MAHESH DESIGNER</div>
          <div className="section-eyebrow" style={{ color: 'var(--clr-gold-dark)', marginTop: 4 }}>Bespoke Tailoring Atelier</div>
        </div>

        <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: 'var(--clr-emerald-dark)', textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          Welcome Back
        </h1>

        {error && (
          <div style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: '#FFEBEE', color: '#C62828', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', fontWeight: 600 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
            <label className="form-label" htmlFor="login-email">Email or Username</label>
            <input
              id="login-email"
              name="username_or_email"
              type="text"
              className="form-input"
              placeholder="your@email.com or username"
              value={form.username_or_email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
            <label className="form-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            id="login-submit-btn"
            type="submit"
            className="btn btn-gold w-full btn-lg"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In to Account'}
          </button>
        </form>

        <div style={{ margin: 'var(--space-6) 0', textAlign: 'center', position: 'relative' }}>
          <span style={{ background: '#FFFFFF', padding: '0 var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', position: 'relative', zIndex: 2 }}>
            New to Mahesh Designer?
          </span>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--clr-border)' }} />
        </div>

        <Link to="/register" id="login-register-link" className="btn btn-outline w-full">
          Create Client Account
        </Link>
      </div>
    </div>
  );
}
