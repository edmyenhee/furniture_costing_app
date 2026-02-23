import { useState, useEffect } from 'react';
import GlobalParams from './components/GlobalParams';
import ItemList from './components/ItemList';

const DEFAULT_PARAMS = { rmPerM3: 420, minMultiplier: 2.2, maxMultiplier: 2.4 };

function loadState() {
  try {
    const s = localStorage.getItem('fcapp');
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

export default function App() {
  const saved = loadState();
  const [rfqName, setRfqName] = useState(saved?.rfqName || '');
  const [params, setParams] = useState(saved?.params || DEFAULT_PARAMS);
  const [items, setItems] = useState(saved?.items || []);

  useEffect(() => {
    localStorage.setItem('fcapp', JSON.stringify({ rfqName, params, items }));
  }, [rfqName, params, items]);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>家具成本計算 RFQ</h1>
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
