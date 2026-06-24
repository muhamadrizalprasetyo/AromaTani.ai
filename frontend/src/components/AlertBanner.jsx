import React from 'react'
import { useStore } from '../store/useStore'
import { AlertTriangle, AlertCircle, X } from 'lucide-react'

export default function AlertBanner() {
  const alerts = useStore(s => s.alerts)
  const dismissAlert = useStore(s => s.dismissAlert)

  if (alerts.length === 0) return null

  const displayAlerts = alerts

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {displayAlerts.map(alert => {
        const isBahaya = alert.status === 'BAHAYA' || alert.status === 'JAMUR_PARAH' || alert.status === 'KUTU'
        
        return (
          <div
            key={alert.id}
            style={{
              padding: '12px 16px', borderRadius: 6,
              backgroundColor: isBahaya ? '#fef2f2' : '#fffbeb',
              border: `1px solid ${isBahaya ? '#fecaca' : '#fde68a'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flex: 1 }}>
              <div style={{ marginTop: 2, color: isBahaya ? '#dc2626' : '#d97706' }}>
                {isBahaya ? <AlertCircle size={20} /> : <AlertTriangle size={20} />}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: isBahaya ? '#991b1b' : '#92400e' }}>
                  {alert.message}
                </p>
                <p style={{ fontSize: 12, color: isBahaya ? '#b91c1c' : '#b45309', marginTop: 2 }}>
                  {alert.deviceId} · {new Date(alert.timestamp).toLocaleTimeString('id-ID')}
                </p>
              </div>
            </div>
            <button
              onClick={() => dismissAlert(alert.id)}
              style={{
                backgroundColor: 'transparent', border: 'none',
                color: isBahaya ? '#dc2626' : '#d97706', cursor: 'pointer', padding: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 4
              }}
            >
              <X size={18} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
