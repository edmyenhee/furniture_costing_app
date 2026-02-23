import { useState } from 'react';
import ItemForm from './ItemForm';
import SummaryTable from './SummaryTable';
import { calcItemTotals } from '../utils/calculations';

export default function ItemList({ items, setItems, params }) {
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addItem = (item) => {
    setItems(prev => [...prev, { ...item, id: Date.now().toString() }]);
    setShowForm(false);
  };

  const updateItem = (item) => {
    setItems(prev => prev.map(i => i.id === item.id ? item : i));
    setEditingId(null);
  };

  const deleteItem = (id) => {
    if (confirm('確定刪除此品項？')) setItems(prev => prev.filter(i => i.id !== id));
  };

  const computedItems = items.map(item => ({
    ...item,
    computedMaterials: calcItemTotals(item, params.rmPerM3, params.minMultiplier, params.maxMultiplier),
  }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h2 style={{ fontSize: 18, margin: 0 }}>品項列表</h2>
        <button onClick={() => setShowForm(true)} style={{ padding: '6px 16px', cursor: 'pointer', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
          + 新增品項
        </button>
      </div>

      {showForm && (
        <ItemForm onSave={addItem} onCancel={() => setShowForm(false)} />
      )}

      {computedItems.map((item, idx) => (
        <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: 6, marginBottom: 16, overflow: 'hidden' }}>
          <div style={{ background: '#e3f2fd', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600 }}>#{idx + 1} {item.name}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setEditingId(item.id)} style={{ padding: '3px 10px', cursor: 'pointer' }}>編輯</button>
              <button onClick={() => deleteItem(item.id)} style={{ padding: '3px 10px', cursor: 'pointer', color: 'red' }}>刪除</button>
            </div>
          </div>
          {editingId === item.id ? (
            <div style={{ padding: 12 }}>
              <ItemForm initialData={item} onSave={updateItem} onCancel={() => setEditingId(null)} />
            </div>
          ) : (
            <SummaryTable computedItem={item} />
          )}
        </div>
      ))}

      {computedItems.length === 0 && !showForm && (
        <p style={{ color: '#888', textAlign: 'center', padding: 32 }}>尚無品項，請點擊「新增品項」</p>
      )}
    </div>
  );
}
