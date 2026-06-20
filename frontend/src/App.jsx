import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './store/authStore'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DoctorList from './pages/doctors/DoctorList'
import PatientList from './pages/patients/PatientList'
import AppointmentList from './pages/appointments/AppointmentList'
import MedicalRecordList from './pages/medical-records/MedicalRecordList'
import PrescriptionList from './pages/prescriptions/PrescriptionList'

function PrivateRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const initializing = useAuthStore((s) => s.initializing)

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="mt-3 text-sm text-gray-500">Memeriksa sesi...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  const initialize = useAuthStore((s) => s.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="doctors" element={<DoctorList />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="medical-records" element={<MedicalRecordList />} />
          <Route path="prescriptions" element={<PrescriptionList />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
