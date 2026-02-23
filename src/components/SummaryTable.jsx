const fmt = (n, d = 4) => (typeof n === 'number' ? n.toFixed(d) : '-');
const fmt2 = (n) => fmt(n, 2);

export default function SummaryTable({ computedItem, currency = 'MYR' }) {
  const mats = computedItem.computedMaterials;
  const isUsd = currency === 'USD';

  const totalMinAll = mats.reduce((s, m) => s + (m.totalMinPrice || 0), 0);
  const totalMaxAll = mats.reduce((s, m) => s + (m.totalMaxPrice || 0), 0);
  const totalLogAll = mats.reduce((s, m) => s + (m.totalLogistic || 0), 0);
  const totalMinAllMyr = mats.reduce((s, m) => s + (m.totalMinPriceMyr || 0), 0);
  const totalMaxAllMyr = mats.reduce((s, m) => s + (m.totalMaxPriceMyr || 0), 0);

  const thS = { padding: '5px 8px', background: '#f5f5f5', fontSize: 12, whiteSpace: 'nowrap', borderBottom: '1px solid #ddd', textAlign: 'left' };
  const tdS = { padding: '5px 8px', fontSize: 12, borderBottom: '1px solid #eee', whiteSpace: 'nowrap' };
  const myrNote = { display: 'block', color: '#999', fontSize: 10 };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thS}>物料</th>
            <th style={thS}>數量</th>
            <th style={thS}>成本 ({currency})</th>
            <th style={thS}>Vol/unit (m³)</th>
            <th style={thS}>Log/unit ({isUsd ? 'USD' : 'MYR'})</th>
            <th style={thS}>Total Vol (m³)</th>
            <th style={thS}>Total Log ({isUsd ? 'USD' : 'MYR'})</th>
            <th style={thS}>Min Price/unit</th>
            <th style={thS}>Max Price/unit</th>
            <th style={thS}>Total Min</th>
            <th style={thS}>Total Max</th>
          </tr>
        </thead>
        <tbody>
          {mats.map(m => (
            <tr key={m.id}>
              <td style={tdS}>{m.description || '-'}</td>
              <td style={tdS}>{m.qty}</td>
              <td style={tdS}>{fmt2(Number(m.costPrice))}</td>
              <td style={tdS}>{fmt(m.volPerUnit, 6)}</td>
              <td style={tdS}>{fmt2(m.logPerUnit)}</td>
              <td style={tdS}>{fmt(m.totalVol, 6)}</td>
              <td style={tdS}>{fmt2(m.totalLogistic)}</td>
              <td style={tdS}>
                {fmt2(m.minPricePerUnit)}
                {isUsd && <span style={myrNote}>MYR {fmt2(m.minPricePerUnitMyr)}</span>}
              </td>
              <td style={tdS}>
                {fmt2(m.maxPricePerUnit)}
                {isUsd && <span style={myrNote}>MYR {fmt2(m.maxPricePerUnitMyr)}</span>}
              </td>
              <td style={tdS}>
                {fmt2(m.totalMinPrice)}
                {isUsd && <span style={myrNote}>MYR {fmt2(m.totalMinPriceMyr)}</span>}
              </td>
              <td style={tdS}>
                {fmt2(m.totalMaxPrice)}
                {isUsd && <span style={myrNote}>MYR {fmt2(m.totalMaxPriceMyr)}</span>}
              </td>
            </tr>
          ))}
          {mats.length > 1 && (
            <tr style={{ fontWeight: 600, background: '#f9f9f9' }}>
              <td style={tdS} colSpan={6}>合計</td>
              <td style={tdS}>{fmt2(totalLogAll)}</td>
              <td style={tdS}></td>
              <td style={tdS}></td>
              <td style={tdS}>
                {fmt2(totalMinAll)}
                {isUsd && <span style={{ ...myrNote, fontWeight: 400 }}>MYR {fmt2(totalMinAllMyr)}</span>}
              </td>
              <td style={tdS}>
                {fmt2(totalMaxAll)}
                {isUsd && <span style={{ ...myrNote, fontWeight: 400 }}>MYR {fmt2(totalMaxAllMyr)}</span>}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
