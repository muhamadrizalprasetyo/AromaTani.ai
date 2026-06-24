import React from 'react'
import { useStore } from '../store/useStore'
import { FileSpreadsheet, Download } from 'lucide-react'

export default function ReportsPage() {
  const activeDeviceId = useStore(s => s.activeDeviceId)
  const readings = useStore(s => s.readings)
  const activeReadings = readings[activeDeviceId] || []

  const recent = [...activeReadings].reverse()
  const statusColor = { AMAN: '#16a34a', WASPADA: '#d97706', JAMUR_AWAL: '#d97706', BAHAYA: '#dc2626', JAMUR_PARAH: '#dc2626', KUTU: '#dc2626' }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Laporan Riwayat</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Data historis dari perangkat {activeDeviceId}</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Download size={16} /> Unduh CSV
        </button>
      </div>

      <div className="clean-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <FileSpreadsheet size={18} color="#64748b" />
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>
            Tabel Bacaan Sensor
          </h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                {['Waktu', 'Suhu', 'Kelembaban', 'VOC (Ω)', 'Etanol (PPM)', 'Status AI', 'Kipas'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#475569', fontWeight: 600, fontSize: 13, borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', color: '#475569', whiteSpace: 'nowrap' }}>
                    {new Date(r.timestamp).toLocaleTimeString('id-ID')}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#1e293b' }}>{r.temperature}°C</td>
                  <td style={{ padding: '12px 16px', color: '#1e293b' }}>{r.humidity}%</td>
                  <td style={{ padding: '12px 16px', color: '#1e293b' }}>{r.gasVOC}</td>
                  <td style={{ padding: '12px 16px', color: '#1e293b' }}>{r.gasEthanol}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      color: statusColor[r.aiStatus] || '#64748b',
                      fontWeight: 500, fontSize: 12,
                      backgroundColor: `${statusColor[r.aiStatus] || '#64748b'}15`,
                      padding: '4px 10px', borderRadius: 4,
                    }}>
                      {r.aiStatus}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    {r.fanActive ? (
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#dc2626' }}>ON</span>
                    ) : (
                      <span style={{ color: '#94a3b8' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr><td colSpan={7} style={{ padding: 32, textAlign: 'center', color: '#64748b' }}>Belum ada data dari sensor.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
