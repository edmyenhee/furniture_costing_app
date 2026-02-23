# Auth 流程

使用 Supabase Auth，純前端實作，無需自建後端。

## 登入流程

1. 用戶在 `LoginPage` 輸入 email + 密碼
2. 呼叫 `supabase.auth.signInWithPassword({ email, password })`
3. Supabase 回傳 session → `onAuthStateChange` 觸發 → `App` 的 `session` state 更新 → 顯示 `AppContent`

## 登出流程

1. 點「登出」按鈕
2. 呼叫 `supabase.auth.signOut()`
3. `onAuthStateChange` 觸發（session 變 null）→ 顯示 `LoginPage`

## 忘記密碼流程

```
LoginPage（點「忘記密碼？」）
    → 切換到 forgot view
    → 輸入 email → resetPasswordForEmail(email, { redirectTo: window.location.origin })
    → Supabase 寄出重設 email
    → 用戶點信件連結 → 瀏覽器回到 app（token 在 URL hash）
    → Supabase 自動偵測 token
    → onAuthStateChange 觸發 event: 'PASSWORD_RECOVERY'
    → App 設定 isResettingPassword = true → 顯示 ResetPasswordPage
    → 用戶輸入新密碼 → supabase.auth.updateUser({ password })
    → 成功 → onDone() → isResettingPassword = false → 顯示 AppContent
```

## Supabase Dashboard 設定

**Authentication → URL Configuration**

| 欄位 | 開發環境 | 正式環境 |
|------|----------|----------|
| Site URL | `http://localhost:5173` | `https://your-domain.com` |
| Redirect URLs | `http://localhost:5173` | `https://your-domain.com` |

Redirect URLs 可以填多個（一行一個），讓開發和正式環境同時支援。

## 環境變數

在 `.env.local`（不進 git）設定：

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

從 Supabase Dashboard → Project Settings → API 取得。
