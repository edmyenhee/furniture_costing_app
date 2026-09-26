import { useState } from 'react';
import { supabase } from '../lib/supabase';

// 對齊 Supabase Auth 的預設最低長度，先在前端擋掉以免顯示英文錯誤訊息
const MIN_PASSWORD_LENGTH = 6;

export default function ResetPasswordPage({ onDone }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`密碼至少需要 ${MIN_PASSWORD_LENGTH} 個字元`);
      return;
    }
    if (password !== confirm) {
      setError('兩次輸入的密碼不一致');
      return;
    }
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else setDone(true);
    setLoading(false);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'sans-serif', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: 320 }}>
        <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 20 }}>{done ? '密碼已更新' : '設定新密碼'}</h2>
        {done ? (
          <>
            <div style={{ color: '#2e7d32', fontSize: 14, marginBottom: 16 }}>
              新密碼已設定完成，下次請使用新密碼登入。
            </div>
            <button
              onClick={onDone}
              style={{ width: '100%', padding: '10px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}
            >
              開始使用
            </button>
          </>
        ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>新密碼</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>確認密碼</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
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
            {loading ? '更新中...' : '確認更新密碼'}
          </button>
        </form>
        )}
      </div>
    </div>
  );
}
