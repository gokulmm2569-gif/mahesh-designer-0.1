import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const { confirm_password, ...data } = form;
    const res = await register(data);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--clr-alabaster)', padding: 'var(--space-8) var(--space-4)' }}>
      <div style={{ background: '#FFFFFF', padding: 'var(--space-10)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--clr-gold-border)', width: '100%', maxWidth: 540, boxShadow: 'var(--shadow-xl)' }}>
        <div className="text-center" style={{ marginBottom: 'var(--space-6)' }}>
          <div className="navbar-brand-name" style={{ fontSize: '1.6rem', color: 'var(--clr-emerald)' }}>MAHESH DESIGNER</div>
          <div className="section-eyebrow" style={{ color: 'var(--clr-gold-dark)', marginTop: 4 }}>Bespoke Tailoring Atelier</div>
        </div>

        <h1 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--text-2xl)', color: 'var(--clr-emerald-dark)', textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          Create Your Client Account
        </h1>

        {error && (
          <div style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: '#FFEBEE', color: '#C62828', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', fontWeight: 600 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">Full Name</label>
              <input id="reg-name" name="full_name" type="text" className="form-input" placeholder="Your Name" value={form.full_name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-username">Username</label>
              <input id="reg-username" name="username" type="text" className="form-input" placeholder="username" value={form.username} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
            <label className="form-label" htmlFor="reg-email">Email Address</label>
            <input id="reg-email" name="email" type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={handleChange} required autoComplete="email" />
          </div>

          <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
            <label className="form-label" htmlFor="reg-mobile">Mobile Number</label>
            <input id="reg-mobile" name="mobile" type="tel" className="form-input" placeholder="10-digit mobile number" value={form.mobile} onChange={handleChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Password</label>
              <input id="reg-password" name="password" type="password" className="form-input" placeholder="Min 6 characters" value={form.password} onChange={handleChange} required autoComplete="new-password" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
              <input id="reg-confirm" name="confirm_password" type="password" className="form-input" placeholder="Repeat password" value={form.confirm_password} onChange={handleChange} required autoComplete="new-password" />
            </div>
          </div>

          <button id="register-submit-btn" type="submit" className="btn btn-gold w-full btn-lg" disabled={loading}>
            {loading ? 'Creating Client Account...' : '✨ Create Account'}
          </button>
        </form>

        <div style={{ margin: 'var(--space-6) 0', textAlign: 'center', position: 'relative' }}>
          <span style={{ background: '#FFFFFF', padding: '0 var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--clr-slate)', position: 'relative', zIndex: 2 }}>
            Already have an account?
          </span>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--clr-border)' }} />
        </div>

        <Link to="/login" id="register-login-link" className="btn btn-outline w-full">
          Sign In
        </Link>
      </div>
    </div>
  );
}
