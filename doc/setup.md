# 環境設定與部署

## 本機開發

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定環境變數

建立 `.env.local`（不進 git）：

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

從 Supabase Dashboard → Project Settings → API 取得。

### 3. 設定 Supabase Redirect URL

Supabase Dashboard → Authentication → URL Configuration：
- **Site URL**：`http://localhost:5173`
- **Redirect URLs**：`http://localhost:5173`

### 4. 啟動 dev server

```bash
npm run dev
```

開啟 `http://localhost:5173`。

---

## 建置 Production

```bash
npm run build
```

產出在 `dist/` 目錄，可部署到任何靜態主機（Vercel、Netlify、GitHub Pages 等）。

### 部署後需更新

Supabase Dashboard → Authentication → URL Configuration：
- **Site URL**：改為正式網址
- **Redirect URLs**：加入正式網址（可同時保留 localhost）

---

## 新增使用者

目前無公開註冊，需透過 Supabase Dashboard 手動新增：

**Authentication → Users → Add user**
- 填入 email + 密碼
- 或 Invite user（寄邀請信）

---

## 常用指令

| 指令 | 用途 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建置 production |
| `npm run preview` | 本機預覽 production build |
