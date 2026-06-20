import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import Button from '../../components/ui/button'
import Input from '../../components/ui/input'
import Select from '../../components/ui/select'
import Textarea from '../../components/ui/textArea'
import Modal from '../../components/ui/modal'
import Badge from '../../components/ui/badge'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../components/ui/table'
import { toast } from '../../lib/toast'

const defaultForm = { patient_id: '', doctor_id: '', appointment_date: '', complaint: '', status: 'scheduled' }

function AppointmentList() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(defaultForm)

  const { data: aptData, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => api.get('/appointments').then((r) => r.data),
  })

  const { data: patientsData } = useQuery({
    queryKey: ['patients-options'],
    queryFn: () => api.get('/patients').then((r) => r.data),
  })

  const { data: doctorsData } = useQuery({
    queryKey: ['doctors-options'],
    queryFn: () => api.get('/doctors').then((r) => r.data),
  })

  const appointments = aptData?.data || []
  const patients = patientsData?.data || []
  const doctors = doctorsData?.data || []

  const filtered = appointments.filter((a) =>
    a.patient?.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.doctor?.name?.toLowerCase().includes(search.toLowerCase())
  )

  const createMutation = useMutation({
    mutationFn: (body) => api.post('/appointments', body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['appointments'] }); toast.success('Janji temu berhasil ditambahkan'); closeModal() },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal menyimpan'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/appointments/${id}`, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['appointments'] }); toast.success('Janji temu berhasil diupdate'); closeModal() },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal mengupdate'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/appointments/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['appointments'] }); toast.success('Janji temu berhasil dihapus') },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal menghapus'),
  })

  function openAdd() {
    setEditing(null)
    setForm(defaultForm)
    setModalOpen(true)
  }

  function openEdit(apt) {
    setEditing(apt)
    setForm({ patient_id: apt.patient_id, doctor_id: apt.doctor_id, appointment_date: apt.appointment_date, complaint: apt.complaint, status: apt.status })
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditing(null)
    setForm(defaultForm)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (editing) {
      updateMutation.mutate({ id: editing.id, body: form })
    } else {
      createMutation.mutate(form)
    }
  }

  const statusBadge = {
    scheduled: 'info',
    completed: 'success',
    cancelled: 'danger',
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Janji Temu</h1>
          <p className="mt-0.5 text-sm text-gray-500 sm:mt-1">Kelola jadwal janji temu pasien</p>
        </div>
        <Button onClick={openAdd} size="sm" className="self-start sm:self-auto">+ Tambah Janji Temu</Button>
      </div>

      <Card>
        <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
          <Input placeholder="Cari pasien/dokter..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-xs" />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Pasien</TableHeader>
                <TableHeader className="hidden sm:table-cell">Dokter</TableHeader>
                <TableHeader>Tanggal</TableHeader>
                <TableHeader className="hidden md:table-cell">Keluhan</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader className="text-right">Aksi</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center text-gray-400 py-6">Memuat...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center text-gray-400 py-6">Tidak ada data</TableCell></TableRow>
              ) : filtered.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">{apt.patient?.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{apt.doctor?.name}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{apt.appointment_date}</TableCell>
                  <TableCell className="hidden max-w-xs truncate md:table-cell">{apt.complaint}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadge[apt.status] || 'default'}>{apt.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 sm:gap-0">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(apt)} className="px-2 sm:px-3">
                        <svg className="h-4 w-4 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="px-2 text-red-600 sm:px-3" onClick={() => { if (confirm('Hapus janji temu ini?')) deleteMutation.mutate(apt.id) }}>
                        <svg className="h-4 w-4 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        <span className="hidden sm:inline">Hapus</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal open={modalOpen} onClose={closeModal} title={editing ? 'Edit Janji Temu' : 'Tambah Janji Temu'} className="mx-4 max-h-[90vh] overflow-y-auto sm:mx-auto sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <Select label="Pasien" value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: e.target.value })} required
            options={[{ value: '', label: 'Pilih Pasien...' }, ...patients.map((p) => ({ value: p.id, label: p.name }))]} />
          <Select label="Dokter" value={form.doctor_id} onChange={(e) => setForm({ ...form, doctor_id: e.target.value })} required
            options={[{ value: '', label: 'Pilih Dokter...' }, ...doctors.map((d) => ({ value: d.id, label: d.name }))]} />
          <Input label="Tanggal & Waktu" type="datetime-local" value={form.appointment_date} onChange={(e) => setForm({ ...form, appointment_date: e.target.value })} required />
          <Textarea label="Keluhan" value={form.complaint} onChange={(e) => setForm({ ...form, complaint: e.target.value })} />
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
            options={[{ value: 'scheduled', label: 'Terjadwal' }, { value: 'completed', label: 'Selesai' }, { value: 'cancelled', label: 'Dibatalkan' }]} />
          <div className="flex justify-end gap-2 sm:gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={closeModal} size="sm" className="sm:text-sm">Batal</Button>
            <Button type="submit" size="sm" className="sm:text-sm" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AppointmentList
