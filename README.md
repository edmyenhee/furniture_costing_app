# 產品成本計算（Furniture Costing App）

給家具業務／採購人員使用的報價輔助工具。輸入每件產品的材料清單（成本、尺寸），
自動計算物流費用與建議售價區間，支援多幣別（MYR / USD）。

> 線上網址：<https://productcostingapp.netlify.app/>（部署於 Netlify，push 到 `master` 自動部署）

---

## Tech Stack

| 層面 | 技術 |
|------|------|
| 前端 | React 18 + Vite 5（JSX，inline CSS，無 CSS framework） |
| 後端 / Auth | Supabase（PostgreSQL + Auth） |
| State | React hooks（useState / useEffect） |
| 資料持久化 | localStorage（報價內容）、Supabase Auth（登入狀態） |
| 部署 | Netlify（`master` 分支自動部署，build command：`npm run build`，publish：`dist/`） |

> 註：專案內殘留 Flutter 相關檔案（`pubspec.yaml`、`android/`、`ios/`、`lib/` 等）是早期腳手架的遺留，**實際使用的是 `src/` 下的 React 程式碼**。

---

## 快速開始

```bash
# 1. 安裝依賴
npm install

# 2. 設定環境變數（建立 .env.local，不進 git）
#    VITE_SUPABASE_URL=https://xxxx.supabase.co
#    VITE_SUPABASE_ANON_KEY=eyJ...
#    從 Supabase Dashboard → Project Settings → API 取得

# 3. 啟動 dev server（http://localhost:5173）
npm run dev
```

Supabase Dashboard → Authentication → URL Configuration 需把 `http://localhost:5173`
加入 Site URL 與 Redirect URLs（密碼重設信件的跳轉會用到）。

## 常用指令

| 指令 | 用途 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建置 production（產出至 `dist/`） |
| `npm run preview` | 本機預覽 production build |

---

## 專案結構

```
src/
├── main.jsx                    # React entry point
├── App.jsx                     # 根元件：管理 auth 狀態、登出、主畫面切換
├── components/
│   ├── LoginPage.jsx           # 登入 / 忘記密碼
│   ├── ResetPasswordPage.jsx   # 設定新密碼（密碼重設流程）
│   ├── GlobalParams.jsx        # 全域參數（RM/m³、售價倍數、幣別、匯率）
│   ├── ItemList.jsx            # 產品列表
│   ├── ItemForm.jsx            # 新增 / 編輯產品
│   └── SummaryTable.jsx        # 計算結果表格
├── lib/supabase.js             # Supabase client 初始化
└── utils/calculations.js       # 核心計算邏輯
```

## 核心概念

- **登入**：Supabase Auth（email + 密碼），無公開註冊，使用者由 Supabase Dashboard 手動新增。
  Session 存在 localStorage，故重開網站會維持登入；右上角有「登出」按鈕。
- **計算**：集中在 `src/utils/calculations.js`。單位體積 → 物流費 → 建議售價區間
  （`(成本 + 物流費) × min/max 倍數`）。USD 模式會額外換算 MYR 顯示，但不影響核心計算。

---

## 更多文件（`doc/`）

- [專案概覽](./doc/overview.md)
- [架構與資料流](./doc/architecture.md)
- [計算邏輯說明](./doc/calculations.md)
- [Auth 流程](./doc/auth.md)
- [元件說明](./doc/components.md)
- [環境設定與部署](./doc/setup.md)
