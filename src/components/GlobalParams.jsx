export default function GlobalParams({ params, setParams }) {
  const upd = (key, val) => setParams(p => ({ ...p, [key]: Number(val) }));
  const updStr = (key, val) => setParams(p => ({ ...p, [key]: val }));
  return (
    <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: 6, marginBottom: 16, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
      <strong>全域參數</strong>
      <label>RM/m³：<input type="number" value={params.rmPerM3} onChange={e => upd('rmPerM3', e.target.value)} style={{ width: 80, marginLeft: 4 }} /></label>
      <label>Min 倍數：<input type="number" step="0.1" value={params.minMultiplier} onChange={e => upd('minMultiplier', e.target.value)} style={{ width: 60, marginLeft: 4 }} /></label>
      <label>Max 倍數：<input type="number" step="0.1" value={params.maxMultiplier} onChange={e => upd('maxMultiplier', e.target.value)} style={{ width: 60, marginLeft: 4 }} /></label>
      <label>幣別：
        <select value={params.currency || 'MYR'} onChange={e => updStr('currency', e.target.value)} style={{ marginLeft: 4 }}>
          <option value="MYR">MYR</option>
          <option value="USD">USD</option>
        </select>
      </label>
      {params.currency === 'USD' && (
        <label>USD→MYR 匯率：<input type="number" step="0.01" value={params.usdToMyr} onChange={e => upd('usdToMyr', e.target.value)} style={{ width: 70, marginLeft: 4 }} /></label>
      )}
    </div>
  );
}
