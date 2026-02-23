# 元件說明

## App.jsx

根元件。管理 auth 狀態，依狀態決定顯示哪個畫面。

**State**
- `session`：Supabase session 物件（`undefined` = loading, `null` = 未登入）
- `isResettingPassword`：是否正在執行密碼重設流程

**邏輯**
- `useEffect` 初始化時取得目前 session，並訂閱 `onAuthStateChange`
- 偵測到 `PASSWORD_RECOVERY` event 時設定 `isResettingPassword = true`

---

## AppContent

主功能畫面（App.jsx 內部，未獨立成檔案）。

**State**
- `rfqName`：RFQ / 專案名稱
- `params`：全域計算參數
- `items`：產品清單

**行為**
- 初始化時從 `localStorage` 讀取資料
- state 變動時自動寫入 `localStorage`

---

## components/GlobalParams.jsx

全域參數設定面板。

**Props**
- `params`：目前參數值
- `setParams`：更新 params

**欄位**
- RM/m³（物流費率）
- 最低 / 最高售價倍率
- 幣別（MYR / USD）
- USD→MYR 匯率（幣別選 USD 時才顯示）

---

## components/ItemList.jsx

產品列表容器。

**Props**
- `items`：產品陣列
- `setItems`：更新 items
- `params`：全域參數（傳給 SummaryTable 計算用）

**行為**
- 新增：顯示空白 `ItemForm`
- 編輯：點產品名稱切換顯示 `ItemForm`（預填現有資料）
- 刪除：移除該 item
- 每個 item 顯示 `SummaryTable`

---

## components/ItemForm.jsx

新增 / 編輯產品的表單。

**Props**
- `initial`：初始 item 資料（新增時為 null）
- `onSave(item)`：儲存回呼
- `onCancel`：取消回呼

**欄位**
- 產品名稱
- 材料表格（可動態新增 / 刪除列）：描述、數量、成本、長、寬、高、壓縮體積（選填）

---

## components/SummaryTable.jsx

顯示計算結果的唯讀表格。

**Props**
- `item`：產品物件
- `params`：全域參數

**欄位**
- 材料描述、數量、成本
- 單位體積、單位物流、總體積、總物流
- 最低 / 最高單價、最低 / 最高總價
- USD 模式下額外顯示 MYR 換算欄

---

## components/LoginPage.jsx

登入與忘記密碼雙模式頁面。

**View state**
- `'login'`：email + 密碼登入
- `'forgot'`：輸入 email 寄送重設連結

**行為**
- login view 下方有「忘記密碼？」連結
- forgot view 下方有「返回登入」連結
- 寄出重設 email 後顯示成功提示文字

---

## components/ResetPasswordPage.jsx

密碼重設表單（密碼重設流程第二步）。

**Props**
- `onDone()`：更新成功後呼叫，清除 `isResettingPassword` flag

**欄位**
- 新密碼
- 確認密碼（需與新密碼一致）

**行為**
- 呼叫 `supabase.auth.updateUser({ password })`
- 成功後呼叫 `onDone()`

---

## lib/supabase.js

初始化並匯出 Supabase client。

```js
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```

金鑰從環境變數 `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` 讀取。

---

## utils/calculations.js

核心計算函式，詳見 [calculations.md](./calculations.md)。
