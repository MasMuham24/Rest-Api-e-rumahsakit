import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import { Card, CardContent } from '../components/ui/card'
import Badge from '../components/ui/badge'

function Dashboard() {
  const { data: doctors } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => api.get('/doctors').then((r) => r.data),
  })

  const { data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: () => api.get('/patients').then((r) => r.data),
  })

  const { data: appointments } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => api.get('/appointments').then((r) => r.data),
  })

  const stats = [
    { label: 'Total Dokter', value: doctors?.data?.length || 0, color: 'bg-blue-500', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { label: 'Total Pasien', value: patients?.data?.length || 0, color: 'bg-green-500', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Janji Temu', value: appointments?.data?.length || 0, color: 'bg-purple-500', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    {
      label: 'Janji Aktif',
      value: appointments?.data?.filter((a) => a.status === 'scheduled').length || 0,
      color: 'bg-amber-500',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Ringkasan data rumah sakit</p>
      </div>

      <div className="grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-3 p-4 sm:p-6 sm:gap-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 ${stat.color} text-white`}>
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 truncate">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h3 className="mb-3 sm:mb-4 font-semibold text-gray-900 text-sm sm:text-base">Janji Temu Terbaru</h3>
            <div className="space-y-3">
              {appointments?.data?.slice(0, 5).map((apt) => (
                <div key={apt.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{apt.patient?.name || 'Pasien'}</p>
                    <p className="text-xs text-gray-500">{apt.doctor?.name || 'Dokter'} — {apt.appointment_date}</p>
                  </div>
                  <Badge variant={apt.status === 'scheduled' ? 'info' : apt.status === 'completed' ? 'success' : 'warning'}>
                    {apt.status}
                  </Badge>
                </div>
              ))}
              {(!appointments?.data || appointments.data.length === 0) && (
                <p className="text-sm text-gray-400">Belum ada janji temu</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <h3 className="mb-3 sm:mb-4 font-semibold text-gray-900 text-sm sm:text-base">Dokter Aktif</h3>
            <div className="space-y-3">
              {doctors?.data?.slice(0, 5).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                      {doc.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.spesialization}</p>
                    </div>
                  </div>
                  <Badge variant={doc.status === 'active' ? 'success' : 'danger'}>{doc.status}</Badge>
                </div>
              ))}
              {(!doctors?.data || doctors.data.length === 0) && (
                <p className="text-sm text-gray-400">Belum ada dokter</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
