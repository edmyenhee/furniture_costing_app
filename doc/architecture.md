# 架構與資料流

## 元件樹

```
App
├── LoginPage          ← session 不存在時顯示
├── ResetPasswordPage  ← PASSWORD_RECOVERY event 時顯示
└── AppContent         ← session 存在時顯示
    ├── GlobalParams
    └── ItemList
        ├── ItemForm   ← 新增 / 編輯模式
        └── SummaryTable
```

## Auth 狀態機

```
session === undefined  →  null（初始 loading，等待 Supabase 回應）
session === null       →  <LoginPage />
isResettingPassword    →  <ResetPasswordPage />
session 存在           →  <AppContent />
```

`session` 的值由 `supabase.auth.getSession()` 初始化，
之後透過 `onAuthStateChange` listener 持續同步。

## 資料流

```
GlobalParams（params state）
        │
        ▼
AppContent（rfqName, params, items）
        │  props 向下傳遞
        ▼
ItemList  →  ItemForm（新增 / 編輯 item）
        │
        ▼
SummaryTable ← calcItemTotals(item, params)
```

所有資料（rfqName、params、items）存在 `AppContent` 的 state，
每次 state 變動透過 `useEffect` 同步寫入 `localStorage`，
重新整理時從 `localStorage` 恢復。

## 資料結構

### Item

```js
{
  id: string,           // crypto.randomUUID()
  name: string,         // 產品名稱
  materials: Material[]
}
```

### Material

```js
{
  id: string,
  description: string,
  qty: number,
  costPrice: number,    // 單位：目前選取幣別
  length: number,       // 公尺
  width: number,
  height: number,
  compressVolume: number | ''  // 若填寫，覆蓋 length×width×height 計算出的體積
}
```

### GlobalParams

```js
{
  rmPerM3: number,        // 每立方公尺物流費（MYR）
  minMultiplier: number,  // 最低售價倍率
  maxMultiplier: number,  // 最高售價倍率
  currency: 'MYR' | 'USD',
  usdToMyr: number        // 匯率，currency === 'USD' 時才有效
}
```
