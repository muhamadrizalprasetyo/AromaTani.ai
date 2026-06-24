import React from 'react'
import { CheckCircle2, AlertTriangle, AlertCircle, Wind, Bug } from 'lucide-react'

const STATUS_CONFIG = {
  AMAN: {
    label: 'AMAN',
    className: 'status-aman',
    description: 'Kualitas beras normal',
    color: '#16a34a',
    icon: <CheckCircle2 size={24} color="#16a34a" />,
  },
  JAMUR_AWAL: {
    label: 'JAMUR AWAL',
    className: 'status-waspada',
    description: 'Deteksi dini fermentasi',
    color: '#d97706',
    icon: <AlertTriangle size={24} color="#d97706" />,
  },
  JAMUR_PARAH: {
    label: 'JAMUR PARAH',
    className: 'status-bahaya',
    description: 'Kontaminasi signifikan',
    color: '#dc2626',
    icon: <AlertCircle size={24} color="#dc2626" />,
  },
  WASPADA: {
    label: 'WASPADA',
    className: 'status-waspada',
    description: 'Perlu pemantauan',
    color: '#d97706',
    icon: <AlertTriangle size={24} color="#d97706" />,
  },
  BAHAYA: {
    label: 'BAHAYA',
    className: 'status-bahaya',
    description: 'Anomali terdeteksi',
    color: '#dc2626',
    icon: <AlertCircle size={24} color="#dc2626" />,
  },
  KUTU: {
    label: 'INDIKASI KUTU',
    className: 'status-bahaya',
    description: 'Serangan kutu beras',
    color: '#dc2626',
    icon: <Bug size={24} color="#dc2626" />,
  },
}

export default function StatusCard({ status = 'AMAN', confidence = 0, fanActive = false }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.AMAN

  return (
    <div className={`clean-card ${config.className}`} style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: config.color, opacity: 0.8, marginBottom: 8 }}>
            Status AI
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {config.icon}
            <span style={{ fontSize: 20, fontWeight: 700, color: config.color }}>
              {config.label}
            </span>
          </div>
          <p style={{ fontSize: 13, color: config.color, opacity: 0.9, marginTop: 4 }}>{config.description}</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 11, color: config.color, opacity: 0.8, marginBottom: 4 }}>Confidence</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: config.color }}>{(confidence * 100).toFixed(0)}%</p>
        </div>
      </div>

      {fanActive && (
        <div style={{
          marginTop: 16, padding: '8px 12px', borderRadius: 6,
          backgroundColor: '#fef2f2', border: '1px solid #fecaca',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Wind size={16} color="#dc2626" />
          <span style={{ fontSize: 13, color: '#dc2626', fontWeight: 500 }}>
            Kipas Sirkulasi Aktif
          </span>
          <span className="pulse-dot" style={{ backgroundColor: '#dc2626', marginLeft: 'auto' }} />
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <div style={{ height: 6, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${confidence * 100}%`,
            backgroundColor: config.color,
            borderRadius: 3, transition: 'width 0.5s ease',
          }} />
        </div>
      </div>
    </div>
  )
}
