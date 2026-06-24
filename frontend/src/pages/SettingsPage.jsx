import React from 'react'

export default function SettingsPage() {
  return (
    <div style={{ width: '100%', maxWidth: 800 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Pengaturan Sistem</h1>
        <p style={{ color: '#64748b', fontSize: 14 }}>Kelola konfigurasi batas bahaya dan profil Anda.</p>
      </div>

      <div className="clean-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>Batas Ambang Gas (Thresholds)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 6 }}>Batas Bahaya VOC (Ω)</label>
              <input type="number" className="input-field" defaultValue={600} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 6 }}>Batas Bahaya Etanol (PPM)</label>
              <input type="number" className="input-field" defaultValue={150} />
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>Pengaturan Notifikasi</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ width: 16, height: 16, accentColor: '#16a34a' }} />
            <span style={{ fontSize: 14, color: '#475569' }}>Aktifkan peringatan suara ketika status berubah menjadi BAHAYA</span>
          </label>
        </div>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 24, textAlign: 'right' }}>
          <button className="btn-primary">Simpan Pengaturan</button>
        </div>
      </div>
    </div>
  )
}
