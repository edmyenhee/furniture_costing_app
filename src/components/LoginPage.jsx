import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  }

  async function handleForgot(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
    if (error) setError(error.message);
    else setResetSent(true);
    setLoading(false);
  }

  const linkStyle = { background: 'none', border: 'none', color: '#1a73e8', cursor: 'pointer', padding: 0, fontSize: 14, textDecoration: 'underline' };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'sans-serif', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: 320 }}>
        {view === 'login' ? (
          <>
            <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 20 }}>產品成本計算 — 登入</h2>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4 }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>密碼</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4 }}
                />
              </div>
              {error && <div style={{ color: 'red', marginBottom: 12, fontSize: 14 }}>{error}</div>}
              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '10px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 4, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600 }}
              >
                {loading ? '登入中...' : '登入'}
              </button>
            </form>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <button onClick={() => { setView('forgot'); setError(''); setResetSent(false); }} style={linkStyle}>
                忘記密碼？
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 20 }}>重設密碼</h2>
            {resetSent ? (
              <div style={{ color: '#2e7d32', fontSize: 14, marginBottom: 16 }}>重設連結已寄出，請檢查 email</div>
            ) : (
              <form onSubmit={handleForgot}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4 }}
                  />
                </div>
                {error && <div style={{ color: 'red', marginBottom: 12, fontSize: 14 }}>{error}</div>}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', padding: '10px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 4, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                >
                  {loading ? '寄送中...' : '寄出重設連結'}
                </button>
              </form>
            )}
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <button onClick={() => { setView('login'); setError(''); }} style={linkStyle}>
                返回登入
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
