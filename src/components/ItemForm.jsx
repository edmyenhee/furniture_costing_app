import { useState } from 'react';

const emptyMaterial = () => ({
  id: Date.now().toString() + Math.random(),
  description: '',
  qty: '',
  costPrice: '',
  length: '',
  width: '',
  height: '',
  compressVolume: '',
});

export default function ItemForm({ initialData, onSave, onCancel, currency = 'MYR' }) {
  const [name, setName] = useState(initialData?.name || '');
  const [materials, setMaterials] = useState(
    initialData?.materials?.length ? initialData.materials : [emptyMaterial()]
  );

  const updMat = (id, key, val) => setMaterials(ms => ms.map(m => m.id === id ? { ...m, [key]: val } : m));
  const addMat = () => setMaterials(ms => [...ms, emptyMaterial()]);
  const delMat = (id) => setMaterials(ms => ms.filter(m => m.id !== id));

  const save = () => {
    if (!name.trim()) return alert('請輸入品項名稱');
    const item = { id: initialData?.id, name, materials };
    onSave(item);
  };

  const inputStyle = { padding: '3px 6px', width: '100%', boxSizing: 'border-box' };
  const thStyle = { padding: '4px 6px', background: '#f0f0f0', fontSize: 12, whiteSpace: 'nowrap' };
  const tdStyle = { padding: '4px 4px' };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 6, padding: 16, marginBottom: 12, background: '#fafafa' }}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontWeight: 600 }}>品項名稱：</label>
        <input value={name} onChange={e => setName(e.target.value)} style={{ marginLeft: 8, padding: '4px 8px', width: 280 }} />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            <th style={thStyle}>物料描述</th>
            <th style={thStyle}>數量</th>
            <th style={thStyle}>成本 ({currency})</th>
            <th style={thStyle}>長 (m)</th>
            <th style={thStyle}>寬 (m)</th>
            <th style={thStyle}>高 (m)</th>
            <th style={thStyle}>壓縮體積 (m³)</th>
            <th style={thStyle}></th>
          </tr>
        </thead>
        <tbody>
          {materials.map(m => (
            <tr key={m.id}>
              <td style={tdStyle}><input value={m.description} onChange={e => updMat(m.id, 'description', e.target.value)} style={inputStyle} /></td>
              <td style={tdStyle}><input type="number" value={m.qty} onChange={e => updMat(m.id, 'qty', e.target.value)} style={{ ...inputStyle, width: 60 }} /></td>
              <td style={tdStyle}><input type="number" value={m.costPrice} onChange={e => updMat(m.id, 'costPrice', e.target.value)} style={{ ...inputStyle, width: 90 }} /></td>
              <td style={tdStyle}><input type="number" step="0.01" value={m.length} onChange={e => updMat(m.id, 'length', e.target.value)} style={{ ...inputStyle, width: 70 }} /></td>
              <td style={tdStyle}><input type="number" step="0.01" value={m.width} onChange={e => updMat(m.id, 'width', e.target.value)} style={{ ...inputStyle, width: 70 }} /></td>
              <td style={tdStyle}><input type="number" step="0.01" value={m.height} onChange={e => updMat(m.id, 'height', e.target.value)} style={{ ...inputStyle, width: 70 }} /></td>
              <td style={tdStyle}><input type="number" step="0.001" value={m.compressVolume} onChange={e => updMat(m.id, 'compressVolume', e.target.value)} placeholder="自動" style={{ ...inputStyle, width: 80 }} /></td>
              <td style={tdStyle}><button onClick={() => delMat(m.id)} style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}>✕</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button onClick={addMat} style={{ padding: '4px 12px', cursor: 'pointer' }}>+ 新增物料</button>
        <button onClick={save} style={{ padding: '4px 16px', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>儲存</button>
        <button onClick={onCancel} style={{ padding: '4px 12px', cursor: 'pointer' }}>取消</button>
      </div>
    </div>
  );
}
