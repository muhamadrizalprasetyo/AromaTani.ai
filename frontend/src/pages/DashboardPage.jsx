import React, { useMemo } from 'react'
import { useStore } from '../store/useStore'
import { Server, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react'

function SummaryCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="clean-card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%', backgroundColor: `${color}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: color
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>{title}</p>
        <p style={{ fontSize: 28, fontWeight: 700, color: '#0f172a' }}>{value}</p>
        {subtitle && <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{subtitle}</p>}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const devices = useStore(s => s.devices)
  const latestReadings = useStore(s => s.latestReadings)
  const alerts = useStore(s => s.alerts)

  const stats = useMemo(() => {
    let amanCount = 0;
    let anomalyCount = 0;
    let activeFans = 0;

    devices.forEach(d => {
      const reading = latestReadings[d.deviceId];
      if (reading) {
        if (reading.aiStatus === 'AMAN') amanCount++;
        else anomalyCount++;
        
        if (reading.fanActive) activeFans++;
      }
    })

    return { amanCount, anomalyCount, activeFans }
  }, [devices, latestReadings])

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Ringkasan Eksekutif</h1>
        <p style={{ color: '#64748b', fontSize: 15 }}>Pantauan status kualitas beras di seluruh gudang secara waktu nyata.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
        <SummaryCard
          title="Total Perangkat"
          value={devices.length}
          subtitle="Semua gudang terhubung"
          icon={<Server size={28} />}
          color="#3b82f6"
        />
        <SummaryCard
          title="Status Aman"
          value={stats.amanCount}
          subtitle="Kualitas beras normal"
          icon={<CheckCircle2 size={28} />}
          color="#16a34a"
        />
        <SummaryCard
          title="Indikasi Anomali"
          value={stats.anomalyCount}
          subtitle="Membutuhkan perhatian"
          icon={<AlertTriangle size={28} />}
          color={stats.anomalyCount > 0 ? '#dc2626' : '#d97706'}
        />
      </div>

      <div className="clean-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 20 }}>
          Status Singkat Per Gudang
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {devices.map(d => {
            const reading = latestReadings[d.deviceId]
            const isSafe = !reading || reading.aiStatus === 'AMAN'
            
            return (
              <div key={d.deviceId} style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px', borderRadius: 8, border: '1px solid #e2e8f0',
                backgroundColor: isSafe ? 'white' : '#fffbeb'
              }}>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>{d.location}</h4>
                  <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>ID: {d.deviceId}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    display: 'inline-block', padding: '4px 12px', borderRadius: 20,
                    fontSize: 12, fontWeight: 600,
                    backgroundColor: isSafe ? '#dcfce7' : '#fef2f2',
                    color: isSafe ? '#16a34a' : '#dc2626'
                  }}>
                    {reading ? reading.aiStatus : 'MENUNGGU DATA'}
                  </span>
                  {reading && <p style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>Suhu: {reading.temperature}°C | Kelembaban: {reading.humidity}%</p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
