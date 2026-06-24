import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { LayoutDashboard, Server, FileSpreadsheet, Settings, LogOut, Bell, Menu } from 'lucide-react'
import AlertBanner from './AlertBanner'

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const user = useStore(s => s.user)
  const logout = useStore(s => s.logout)
  const alerts = useStore(s => s.alerts)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/dashboard', label: 'Ringkasan', icon: <LayoutDashboard size={20} /> },
    { path: '/devices', label: 'Perangkat', icon: <Server size={20} /> },
    { path: '/reports', label: 'Laporan', icon: <FileSpreadsheet size={20} /> },
    { path: '/settings', label: 'Pengaturan', icon: <Settings size={20} /> },
  ]

  return (
    <div className="layout-wrapper">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} 
        onClick={() => setIsSidebarOpen(false)} 
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'desktop-open mobile-open' : 'desktop-closed'}`}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', paddingLeft: 24, flexShrink: 0, borderBottom: '1px solid #e2e8f0' }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ 
              background: 'transparent', border: 'none', cursor: 'pointer', 
              display: 'flex', padding: 4, borderRadius: 8, color: '#475569',
              marginLeft: -8 // to align nicely
            }}
          >
            <Menu size={24} />
          </button>
        </div>

        <nav style={{ padding: '24px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px', borderRadius: 8,
                color: isActive ? '#15803d' : '#475569',
                backgroundColor: isActive ? '#f0fdf4' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                justifyContent: isSidebarOpen ? 'flex-start' : 'center',
              })}
              title={!isSidebarOpen ? item.label : undefined}
            >
              <div style={{ flexShrink: 0 }}>{item.icon}</div>
              {isSidebarOpen && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '20px 12px', borderTop: '1px solid #e2e8f0' }}>
          <button
            onClick={handleLogout}
            title={!isSidebarOpen ? 'Keluar' : undefined}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px', borderRadius: 8,
              color: '#dc2626', backgroundColor: '#fef2f2',
              border: 'none', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.15s ease',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center',
            }}
          >
            <div style={{ flexShrink: 0 }}><LogOut size={20} /></div>
            {isSidebarOpen && <span style={{ whiteSpace: 'nowrap' }}>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Header */}
        <header className="header-container" style={{
          height: 64, backgroundColor: 'white', borderBottom: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', flexShrink: 0
        }}>
          {/* Left: Spacer / Hamburger (Mobile) */}
          <div className="header-spacer" style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
              style={{ 
                background: 'transparent', border: 'none', cursor: 'pointer', 
                padding: 4, borderRadius: 8, color: '#475569', marginLeft: -8
              }}
            >
              <Menu size={24} />
            </button>
          </div>
          
          {/* Center: Logo */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <img 
               src="/logo.png" 
               alt="Logo AromaTani.ai" 
               style={{ height: 36, objectFit: 'contain' }} 
               onError={(e) => { e.target.style.display = 'none' }} 
             />
          </div>

          {/* Right: User Menu */}
          <div className="header-user" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 20 }}>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}
              >
                <Bell size={20} color="#64748b" />
                {alerts.length > 0 && (
                  <span style={{
                    position: 'absolute', top: -6, right: -6,
                    backgroundColor: '#dc2626', color: 'white', borderRadius: '50%',
                    fontSize: 10, fontWeight: 700, width: 16, height: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {alerts.length}
                  </span>
                )}
              </button>
              
              {/* Notif Dropdown */}
              {isNotifOpen && (
                <div style={{
                  position: 'absolute', top: 32, right: -10, width: 340,
                  backgroundColor: 'white', border: '1px solid #e2e8f0',
                  borderRadius: 8, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  zIndex: 50, padding: 16, maxHeight: 400, overflowY: 'auto'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Notifikasi</h3>
                    <button onClick={() => setIsNotifOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 12 }}>Tutup</button>
                  </div>
                  {alerts.length === 0 ? (
                    <p style={{ fontSize: 13, color: '#64748b', textAlign: 'center', padding: '20px 0' }}>Tidak ada peringatan baru.</p>
                  ) : (
                    <AlertBanner />
                  )}
                </div>
              )}
            </div>
            <div style={{ width: 1, height: 24, backgroundColor: '#e2e8f0' }} />
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{user?.username || 'Admin'}</p>
              <p style={{ fontSize: 11, color: '#64748b' }}>Administrator</p>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="main-scroll-area" style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
