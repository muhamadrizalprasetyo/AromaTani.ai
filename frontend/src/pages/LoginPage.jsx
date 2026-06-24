import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  const login = useStore(s => s.login)
  const startSimulation = useStore(s => s.startSimulation)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Username dan password wajib diisi.')
      return
    }

    setLoading(true)
    const result = await login(username.trim(), password)
    
    if (result.success) {
      startSimulation()
      navigate('/dashboard')
    } else {
      setError(result.message || 'Kredensial tidak valid.')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#ffffff', padding: 24,
      backgroundImage: 'radial-gradient(circle at 50% 0%, #f0fdf4 0%, transparent 60%)' // Very subtle top glow
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <img 
            src="/logo.png" 
            alt="AromaTani.ai Logo" 
            style={{ width: '100%', maxHeight: 90, objectFit: 'contain', margin: '0 auto 16px', display: 'block' }} 
            onError={(e) => { e.target.style.display = 'none' }} 
          />
          <p style={{ color: '#64748b', fontSize: 15, fontWeight: 400, letterSpacing: '0.2px' }}>
            Pemantauan Kualitas Beras Terpadu
          </p>
        </div>

        <div style={{ 
          padding: '40px', 
          backgroundColor: 'white', 
          borderRadius: 24, 
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05), 0 0 10px rgba(0,0,0,0.01)',
          border: '1px solid #f1f5f9'
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 32, textAlign: 'center' }}>
            Masuk ke Akun
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label htmlFor="username" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 16, top: 14, color: '#94a3b8' }}>
                  <User size={20} />
                </div>
                <input
                  id="username"
                  className="input-field"
                  style={{ 
                    padding: '14px 16px 14px 48px', 
                    fontSize: 15, 
                    borderRadius: 12,
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.2s ease'
                  }}
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                  onFocus={(e) => { e.target.style.backgroundColor = '#ffffff'; e.target.style.borderColor = '#22c55e' }}
                  onBlur={(e) => { e.target.style.backgroundColor = '#f8fafc'; e.target.style.borderColor = '#e2e8f0' }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 16, top: 14, color: '#94a3b8' }}>
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  className="input-field"
                  style={{ 
                    padding: '14px 48px 14px 48px', // Extra padding on right for the eye icon
                    fontSize: 15, 
                    borderRadius: 12,
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.2s ease',
                    width: '100%'
                  }}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  onFocus={(e) => { e.target.style.backgroundColor = '#ffffff'; e.target.style.borderColor = '#22c55e' }}
                  onBlur={(e) => { e.target.style.backgroundColor = '#f8fafc'; e.target.style.borderColor = '#e2e8f0' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ 
                    position: 'absolute', right: 12, top: 12, 
                    background: 'none', border: 'none', color: '#94a3b8', 
                    cursor: 'pointer', padding: 4, display: 'flex' 
                  }}
                  title={showPassword ? "Sembunyikan Password" : "Lihat Password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: -4 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: '#16a34a', cursor: 'pointer' }}
                />
                <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>Ingat Saya</span>
              </label>
              <a href="#" style={{ fontSize: 13, color: '#16a34a', fontWeight: 600, textDecoration: 'none' }}>
                Lupa Password?
              </a>
            </div>

            {error && (
              <div style={{
                backgroundColor: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: 8, padding: '12px 16px', color: '#dc2626', fontSize: 13,
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                <span style={{ fontWeight: 600 }}>Gagal:</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ 
                marginTop: 12, 
                width: '100%', 
                padding: '16px',
                borderRadius: 12,
                backgroundColor: loading ? '#86efac' : (isHovered ? '#15803d' : '#16a34a'),
                color: 'white',
                border: 'none',
                fontWeight: 600,
                fontSize: 15,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
                boxShadow: isHovered && !loading ? '0 10px 15px -3px rgba(22, 163, 74, 0.3)' : 'none',
                transform: isHovered && !loading ? 'translateY(-1px)' : 'none'
              }}
            >
              {loading ? 'Memverifikasi...' : (
                <>
                  Masuk ke Dasbor
                  <ArrowRight size={20} style={{ 
                    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'transform 0.2s ease'
                  }} />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ fontSize: 12, color: '#94a3b8' }}>
            &copy; {new Date().getFullYear()} AromaTani.ai. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
