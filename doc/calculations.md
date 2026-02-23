# 計算邏輯說明

所有計算集中在 `src/utils/calculations.js`。

## 公式

### 1. 單位體積

```
volumePerUnit = length × width × height  (m³)
```

若使用者填了 `compressVolume`，則 `totalVolume` 改用 compressVolume，
但 `volumePerUnit` 仍用 L×W×H（顯示參考用）。

### 2. 單位物流費

```
logisticPerUnit = volumePerUnit × rmPerM3  (MYR)
```

### 3. 總體積

```
totalVolume = compressVolume 有值 ? compressVolume : volumePerUnit × qty
```

### 4. 總物流費

```
totalLogistic = totalVolume × rmPerM3  (MYR)
```

### 5. 建議售價（每件）

```
minPrice = (costPrice + logisticPerUnit) × minMultiplier
maxPrice = (costPrice + logisticPerUnit) × maxMultiplier
```

> 注意：costPrice 是以目前選取幣別（MYR 或 USD）輸入的值。
> 計算時不做匯率轉換；物流費 logisticPerUnit 的幣別與 costPrice 相同。

### 6. USD 模式下的 MYR 換算

當 `currency === 'USD'` 時，`calcItemTotals` 額外輸出：

```
costPriceMyr    = costPrice × usdToMyr
minPriceMyr     = minPrice  × usdToMyr
maxPriceMyr     = maxPrice  × usdToMyr
minPriceTotalMyr = minPrice × qty × usdToMyr
maxPriceTotalMyr = maxPrice × qty × usdToMyr
```

這些欄位只用於 `SummaryTable` 的附加顯示，不影響核心計算。

## 函式對應表

| 函式 | 輸入 | 輸出 |
|------|------|------|
| `calcVolumePerUnit(l, w, h)` | 長寬高（m） | m³ |
| `calcLogisticPerUnit(volumePerUnit, rmPerM3)` | m³, RM/m³ | MYR |
| `calcTotalVolume(volumePerUnit, qty, compressVolume)` | - | m³ |
| `calcTotalLogistic(totalVolume, rmPerM3)` | - | MYR |
| `calcMinPrice(costPrice, logPerUnit, minMultiplier)` | - | 幣別同 costPrice |
| `calcMaxPrice(costPrice, logPerUnit, maxMultiplier)` | - | 幣別同 costPrice |
| `calcItemTotals(item, rmPerM3, minMultiplier, maxMultiplier, currency, usdToMyr)` | item 物件 + 全域參數 | 含所有計算欄位的 materials 陣列 |
