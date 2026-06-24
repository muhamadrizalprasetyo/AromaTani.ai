import React, { useMemo } from 'react'
import { useStore } from '../store/useStore'
import DeviceList from '../components/DeviceList'
import StatusCard from '../components/StatusCard'
import GasChart from '../components/GasChart'
import { ThermometerSun, Droplets, Activity } from 'lucide-react'

function MetricTile({ label, value, unit, icon, color = '#64748b' }) {
  return (
    <div className="clean-card" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{ color }}>{icon}</div>
        <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
          {label}
        </p>
      </div>
      <p style={{ fontSize: 28, fontWeight: 700, color: '#0f172a' }}>
        {value}
        <span style={{ fontSize: 14, fontWeight: 500, color: '#64748b', marginLeft: 4 }}>{unit}</span>
      </p>
    </div>
  )
}

export default function DevicesPage() {
  const activeDeviceId = useStore(s => s.activeDeviceId)
  const devices = useStore(s => s.devices)
  const readings = useStore(s => s.readings)
  const latestReadings = useStore(s => s.latestReadings)

  const activeDevice = devices.find(d => d.deviceId === activeDeviceId)
  const activeReadings = readings[activeDeviceId] || []
  const latest = latestReadings[activeDeviceId]

  const stats = useMemo(() => {
    if (activeReadings.length === 0) return null
    const n = activeReadings.length
    return {
      avgTemp: (activeReadings.reduce((s, r) => s + r.temperature, 0) / n).toFixed(1),
      avgHum: (activeReadings.reduce((s, r) => s + r.humidity, 0) / n).toFixed(1),
      maxVOC: Math.max(...activeReadings.map(r => r.gasVOC)),
    }
  }, [activeReadings])

  return (
    <div style={{ display: 'flex', gap: 32, height: '100%' }}>
      {/* Sidebar Khusus Devices */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <DeviceList />
      </div>

      {/* Konten Utama Devices */}
      <div style={{ flex: 1, paddingBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>
                {activeDevice?.location || activeDeviceId}
              </h2>
              <span style={{
                fontSize: 12, padding: '4px 10px', borderRadius: 4, fontWeight: 500,
                backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0',
              }}>
                {activeDeviceId}
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: 14 }}>
              Pembaruan setiap 5 detik · {activeReadings.length} sampel terkumpul
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 20, marginBottom: 24 }}>
          <div style={{ gridColumn: 'span 1' }}>
            <StatusCard
              status={latest?.aiStatus || 'AMAN'}
              confidence={latest?.confidence || 0}
              fanActive={latest?.fanActive || false}
            />
          </div>
          <MetricTile
            label="Suhu Rata-Rata"
            value={stats?.avgTemp || '—'}
            unit="°C"
            icon={<ThermometerSun size={20} />}
            color="#ea580c"
          />
          <MetricTile
            label="Kelembaban Rata-Rata"
            value={stats?.avgHum || '—'}
            unit="%"
            icon={<Droplets size={20} />}
            color="#6366f1"
          />
          <MetricTile
            label="VOC Tertinggi"
            value={stats?.maxVOC || '—'}
            unit="Ω"
            icon={<Activity size={20} />}
            color={stats?.maxVOC > 600 ? '#dc2626' : stats?.maxVOC > 350 ? '#d97706' : '#16a34a'}
          />
        </div>

        <div className="clean-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 24 }}>
            Grafik Real-Time Sensor
          </h3>
          <GasChart readings={activeReadings} />
        </div>
      </div>
    </div>
  )
}
