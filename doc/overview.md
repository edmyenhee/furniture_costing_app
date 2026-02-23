# 產品成本計算 — 專案概覽

## 用途

給家具業務/採購人員使用的報價輔助工具。輸入每件產品的材料清單（含成本、尺寸），自動計算物流費用與建議售價區間，支援多幣別（MYR / USD）。

## Tech Stack

| 層面 | 技術 |
|------|------|
| 前端框架 | React 18 + Vite 5 |
| 後端 / Auth | Supabase（PostgreSQL + Auth） |
| 語言 | JavaScript（JSX） |
| 樣式 | Inline CSS（無 CSS framework） |
| State 管理 | React hooks（useState / useEffect） |
| 資料持久化 | localStorage（前端）、Supabase Auth（登入狀態） |

## 目錄結構

```
furniture_costing_app/
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # 根元件，管理 auth 狀態與主畫面切換
│   ├── components/
│   │   ├── LoginPage.jsx     # 登入 / 忘記密碼
│   │   ├── ResetPasswordPage.jsx  # 設定新密碼（密碼重設流程）
│   │   ├── GlobalParams.jsx  # 全域參數設定
│   │   ├── ItemList.jsx      # 產品列表
│   │   ├── ItemForm.jsx      # 新增 / 編輯產品表單
│   │   └── SummaryTable.jsx  # 計算結果表格
│   ├── lib/
│   │   └── supabase.js       # Supabase client 初始化
│   └── utils/
│       └── calculations.js   # 核心計算邏輯
├── doc/                      # 專案文件（本目錄）
├── index.html
├── vite.config.js
├── package.json
└── .env.local                # Supabase 金鑰（不進 git）
```

## 相關文件

- [架構與資料流](./architecture.md)
- [計算邏輯說明](./calculations.md)
- [Auth 流程](./auth.md)
- [元件說明](./components.md)
- [環境設定與部署](./setup.md)
