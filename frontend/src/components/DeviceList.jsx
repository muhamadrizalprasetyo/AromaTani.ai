import React from 'react'
import { useStore } from '../store/useStore'
import { MapPin, Wind, Thermometer, Droplets } from 'lucide-react'

const STATUS_DOT = {
  AMAN: '#16a34a',
  WASPADA: '#d97706',
  JAMUR_AWAL: '#d97706',
  BAHAYA: '#dc2626',
  JAMUR_PARAH: '#dc2626',
  KUTU: '#dc2626',
}

export default function DeviceList() {
  const devices = useStore(s => s.devices)
  const latestReadings = useStore(s => s.latestReadings)
  const activeDeviceId = useStore(s => s.activeDeviceId)
  const setActiveDevice = useStore(s => s.setActiveDevice)

  return (
    <div className="clean-card" style={{ padding: '16px 0', height: '100%', border: 'none', borderRight: '1px solid #e2e8f0', borderRadius: 0, boxShadow: 'none' }}>
      <div style={{ padding: '0 16px 12px', borderBottom: '1px solid #f1f5f9' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#64748b' }}>
          Perangkat Terdaftar
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '12px 8px 0' }}>
        {devices.map(device => {
          const latest = latestReadings[device.deviceId]
          const status = latest?.aiStatus || 'AMAN'
          const isActive = device.deviceId === activeDeviceId

          return (
            <button
              key={device.deviceId}
              onClick={() => setActiveDevice(device.deviceId)}
              style={{
                backgroundColor: isActive ? '#f0fdf4' : 'transparent',
                border: isActive ? '1px solid #bbf7d0' : '1px solid transparent',
                borderRadius: 8, padding: '12px', cursor: 'pointer',
                textAlign: 'left', width: '100%', transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span
                      className="pulse-dot"
                      style={{ backgroundColor: device.status === 'online' ? '#16a34a' : '#94a3b8' }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 600, color: isActive ? '#15803d' : '#334155' }}>
                      {device.deviceId}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748b' }}>
                    <MapPin size={12} />
                    <p style={{ fontSize: 11, lineHeight: 1.4 }}>
                      {device.location}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{
                    display: 'inline-block', padding: '2px 8px', borderRadius: 4,
                    fontSize: 10, fontWeight: 600,
                    backgroundColor: `${STATUS_DOT[status]}15`,
                    color: STATUS_DOT[status],
                  }}>
                    {status}
                  </span>
                </div>
              </div>

              {latest && (
                <div style={{ display: 'flex', gap: 12, marginTop: 10, paddingTop: 10, borderTop: isActive ? '1px solid #dcfce7' : '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: 11, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Thermometer size={12} /> {latest.temperature}°C
                  </span>
                  <span style={{ fontSize: 11, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Droplets size={12} /> {latest.humidity}%
                  </span>
                  {latest.fanActive && (
                    <span style={{ fontSize: 11, color: '#dc2626', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Wind size={12} /> ON
                    </span>
                  )}
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div style={{ padding: '16px', marginTop: 16, borderTop: '1px solid #f1f5f9' }}>
        <p style={{ fontSize: 11, color: '#475569', marginBottom: 8, fontWeight: 600 }}>Legenda Status:</p>
        {[
          { color: '#16a34a', label: 'Aman' },
          { color: '#d97706', label: 'Waspada / Jamur Awal' },
          { color: '#dc2626', label: 'Bahaya / Jamur Parah' },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: '#64748b' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
