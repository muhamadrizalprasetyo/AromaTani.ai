import React from 'react'
import { useStore } from '../store/useStore'
import { Wheat, LogOut, Activity, Bell } from 'lucide-react'

export default function Navbar() {
  const user = useStore(s => s.user)
  const logout = useStore(s => s.logout)
  const stopSimulation = useStore(s => s.stopSimulation)
  const alerts = useStore(s => s.alerts)

  const handleLogout = () => {
    stopSimulation()
    logout()
  }

  return (
    <nav style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e2e8f0',
      padding: '0 24px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ color: '#16a34a' }}>
          <Wheat size={24} />
        </div>
        <div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>
            AromaTani.ai
          </span>
        </div>
        <span style={{
          fontSize: 11, color: '#64748b', fontWeight: 500,
          backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: 4,
          marginLeft: 8,
        }}>
          v1.0.0
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Activity size={16} color="#16a34a" />
        <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>Pemantauan Aktif</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative' }}>
          <Bell size={20} color="#64748b" />
          {alerts.length > 0 && (
            <span style={{
              position: 'absolute', top: -4, right: -4,
              backgroundColor: '#dc2626', color: 'white', borderRadius: '50%',
              fontSize: 10, fontWeight: 700, width: 16, height: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {alerts.length}
            </span>
          )}
        </div>
        <div style={{ width: 1, height: 24, backgroundColor: '#e2e8f0' }} />
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{user?.username}</p>
          <p style={{ fontSize: 11, color: '#64748b' }}>Administrator</p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: 'transparent', border: '1px solid #e2e8f0',
            borderRadius: 6, color: '#475569', cursor: 'pointer',
            padding: '6px 12px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6
          }}
        >
          <LogOut size={16} /> Keluar
        </button>
      </div>
    </nav>
  )
}
