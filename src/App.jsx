import { useState, useEffect } from 'react';
import GlobalParams from './components/GlobalParams';
import ItemList from './components/ItemList';
import LoginPage from './components/LoginPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import { supabase } from './lib/supabase';

const DEFAULT_PARAMS = { rmPerM3: 420, minMultiplier: 2.2, maxMultiplier: 2.4, currency: 'MYR', usdToMyr: 4.5 };

// Supabase 在連結失效時會導回 #error=...&error_code=...，但 auth-js 會把這個錯誤吞掉、
// 不發出任何 onAuthStateChange 事件，所以只能自己讀 URL。錯誤路徑不會清除 hash，讀完由我們自己清。
function takeUrlAuthError() {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  if (!params.get('error') && !params.get('error_code')) return '';

  window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);

  if (params.get('error_code') === 'otp_expired') {
    return '重設密碼連結已失效（有效期限 1 小時），請重新申請。';
  }
  return params.get('error_description') || '這個連結無效，請重新申請。';
}

// 在 module 載入時就取走，每次頁面載入只執行一次。
// 不能放在 useState 初始化函式裡：StrictMode 會呼叫兩次，第二次會拿到已被清空的 hash。
const URL_AUTH_ERROR = takeUrlAuthError();

function loadState() {
  try {
    const s = localStorage.getItem('fcapp');
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setIsResettingPassword(true);
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) return null; // loading
  if (isResettingPassword) return <ResetPasswordPage onDone={() => setIsResettingPassword(false)} />;
  if (!session) return <LoginPage initialError={URL_AUTH_ERROR} />;

  return <AppContent />;
}

function AppContent() {
  const saved = loadState();
  const [rfqName, setRfqName] = useState(saved?.rfqName || '');
  const [params, setParams] = useState(saved?.params || DEFAULT_PARAMS);
  const [items, setItems] = useState(saved?.items || []);

  useEffect(() => {
    localStorage.setItem('fcapp', JSON.stringify({ rfqName, params, items }));
  }, [rfqName, params, items]);

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h1 style={{ fontSize: 22, margin: 0 }}>產品成本計算</h1>
        <button
          onClick={handleSignOut}
          style={{ padding: '6px 16px', background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}
        >
          登出
        </button>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontWeight: 600 }}>RFQ 名稱：</label>
        <input
          value={rfqName}
          onChange={e => setRfqName(e.target.value)}
          placeholder="客戶/專案名稱"
          style={{ marginLeft: 8, padding: '4px 8px', width: 240 }}
        />
      </div>
      <GlobalParams params={params} setParams={setParams} />
      <ItemList items={items} setItems={setItems} params={params} />
    </div>
  );
}
