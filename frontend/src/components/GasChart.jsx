import React, { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts'

const STATUS_THRESHOLDS = {
  gasVOC: { waspada: 350, bahaya: 600 },
  gasEthanol: { waspada: 80, bahaya: 200 },
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '12px 16px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }}>
      <p style={{ color: '#64748b', fontSize: 12, marginBottom: 8, fontWeight: 500 }}>{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: p.color, display: 'inline-block' }} />
          <span style={{ color: '#475569', fontSize: 13 }}>{p.name}:</span>
          <span style={{ color: '#0f172a', fontWeight: 600, fontSize: 13 }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function GasChart({ readings = [] }) {
  const chartData = useMemo(() => readings.map(r => ({
    time: new Date(r.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    'VOC (Ω)': r.gasVOC,
    'Etanol (PPM)': r.gasEthanol,
    'Suhu (°C)': r.temperature,
    'Kelembaban (%)': r.humidity,
  })), [readings])

  if (chartData.length < 2) {
    return (
      <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
        <span>Menunggu data sensor...</span>
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <p style={{ color: '#64748b', fontSize: 12, marginBottom: 12, fontWeight: 600, textTransform: 'uppercase' }}>
        Kadar Gas Organik
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} interval="preserveStartEnd" />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: '#475569', fontSize: 12, paddingTop: 10 }} iconType="circle" />
          
          <ReferenceLine y={STATUS_THRESHOLDS.gasVOC.waspada} stroke="#d97706" strokeDasharray="4 4" strokeOpacity={0.5} label={{ position: 'insideTopLeft', value: 'Waspada', fill: '#d97706', fontSize: 10 }} />
          <ReferenceLine y={STATUS_THRESHOLDS.gasVOC.bahaya} stroke="#dc2626" strokeDasharray="4 4" strokeOpacity={0.5} label={{ position: 'insideTopLeft', value: 'Bahaya', fill: '#dc2626', fontSize: 10 }} />
          
          <Line type="monotone" dataKey="VOC (Ω)" stroke="#16a34a" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#16a34a', strokeWidth: 0 }} />
          <Line type="monotone" dataKey="Etanol (PPM)" stroke="#0284c7" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#0284c7', strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>

      <p style={{ color: '#64748b', fontSize: 12, marginTop: 24, marginBottom: 12, fontWeight: 600, textTransform: 'uppercase' }}>
        Suhu & Kelembaban
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={chartData} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} interval="preserveStartEnd" />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: '#475569', fontSize: 12, paddingTop: 10 }} iconType="circle" />
          <Line type="monotone" dataKey="Suhu (°C)" stroke="#ea580c" strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
          <Line type="monotone" dataKey="Kelembaban (%)" stroke="#6366f1" strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
