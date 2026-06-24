import { create } from 'zustand'

export const useStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('token'),
  devices: [
    { deviceId: 'GDG-001', location: 'Gudang Utama — Bekasi', status: 'online' },
    { deviceId: 'GDG-002', location: 'Gudang Cabang — Karawang', status: 'online' },
    { deviceId: 'GDG-003', location: 'Toko Beras Keluarga — Depok', status: 'online' },
  ],
  activeDeviceId: 'GDG-001',
  readings: {},
  latestReadings: {},
  alerts: [],
  simulationInterval: null,

  login: async (username, password) => {
    // Mock API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((username === 'admin' && password === 'demo') || password === 'admin123') {
          const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock';
          const mockUser = { username, role: 'admin' };
          
          localStorage.setItem('token', mockToken);
          localStorage.setItem('user', JSON.stringify(mockUser));
          
          set({ user: mockUser, isAuthenticated: true });
          resolve({ success: true });
        } else {
          resolve({ success: false, message: 'Kredensial tidak valid.' });
        }
      }, 600);
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false, alerts: [], readings: {}, latestReadings: {} });
    get().stopSimulation();
  },

  setActiveDevice: (id) => set({ activeDeviceId: id }),

  dismissAlert: (id) => set(state => ({
    alerts: state.alerts.filter(a => a.id !== id)
  })),

  // Simulation for frontend dev
  startSimulation: () => {
    if (get().simulationInterval) return

    const interval = setInterval(() => {
      const { devices, readings, latestReadings } = get()
      const newReadings = { ...readings }
      const newLatest = { ...latestReadings }
      const newAlerts = []

      devices.forEach(d => {
        if (!newReadings[d.deviceId]) newReadings[d.deviceId] = []

        const baseTemp = 28 + Math.random() * 5
        const baseHum = 60 + Math.random() * 20
        const baseVOC = 100 + Math.random() * 150
        const baseEth = 10 + Math.random() * 20

        const isAnomaly = Math.random() > 0.95
        
        const reading = {
          timestamp: new Date().toISOString(),
          temperature: +(isAnomaly ? baseTemp + 5 : baseTemp).toFixed(1),
          humidity: +(isAnomaly ? baseHum + 10 : baseHum).toFixed(1),
          gasVOC: +(isAnomaly ? baseVOC + 300 : baseVOC).toFixed(0),
          gasEthanol: +(isAnomaly ? baseEth + 50 : baseEth).toFixed(1),
          aiStatus: 'AMAN',
          confidence: +(0.85 + Math.random() * 0.1).toFixed(2),
          fanActive: false,
        }

        if (reading.gasVOC > 600 || reading.gasEthanol > 150) {
          reading.aiStatus = 'BAHAYA'
          reading.fanActive = true
          reading.confidence = +(0.9 + Math.random() * 0.08).toFixed(2)
          newAlerts.push({
            id: Date.now() + Math.random(),
            deviceId: d.deviceId,
            status: 'BAHAYA',
            message: 'Kadar gas sangat tinggi terdeteksi! Kipas diaktifkan.'
          })
        } else if (reading.gasVOC > 350 || reading.gasEthanol > 80) {
          reading.aiStatus = 'JAMUR_AWAL'
          reading.confidence = +(0.75 + Math.random() * 0.15).toFixed(2)
          newAlerts.push({
            id: Date.now() + Math.random(),
            deviceId: d.deviceId,
            status: 'WASPADA',
            message: 'Indikasi awal jamur beras.'
          })
        }

        newReadings[d.deviceId].push(reading)
        if (newReadings[d.deviceId].length > 50) {
          newReadings[d.deviceId].shift()
        }
        newLatest[d.deviceId] = reading
      })

      set(state => ({
        readings: newReadings,
        latestReadings: newLatest,
        alerts: [...newAlerts, ...state.alerts].slice(0, 5) // keep max 5 alerts
      }))
    }, 5000)

    set({ simulationInterval: interval })
  },

  stopSimulation: () => {
    const { simulationInterval } = get()
    if (simulationInterval) {
      clearInterval(simulationInterval)
      set({ simulationInterval: null })
    }
  }
}))
