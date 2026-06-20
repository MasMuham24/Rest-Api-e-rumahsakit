import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import Button from '../../components/ui/button'
import Input from '../../components/ui/input'
import Textarea from '../../components/ui/textArea'
import Select from '../../components/ui/select'
import Modal from '../../components/ui/modal'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../components/ui/table'
import { toast } from '../../lib/toast'

const defaultForm = { appointment_id: '', diagnosis: '', treatment: '', notes: '' }

function MedicalRecordList() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(defaultForm)

  const { data, isLoading } = useQuery({
    queryKey: ['medical-records'],
    queryFn: () => api.get('/medical-record').then((r) => r.data),
  })

  const { data: appointmentsData } = useQuery({
    queryKey: ['appointments-options-mr'],
    queryFn: () => api.get('/appointments').then((r) => r.data),
  })

  const records = data?.data || []
  const appointments = appointmentsData?.data || []

  const filtered = records.filter((r) =>
    r.appointment?.patient?.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.diagnosis?.toLowerCase().includes(search.toLowerCase())
  )

  const createMutation = useMutation({
    mutationFn: (body) => api.post('/medical-record', body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['medical-records'] }); toast.success('Rekam medis berhasil ditambahkan'); closeModal() },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal menyimpan'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/medical-record/${id}`, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['medical-records'] }); toast.success('Rekam medis berhasil diupdate'); closeModal() },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal mengupdate'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/medical-record/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['medical-records'] }); toast.success('Rekam medis berhasil dihapus') },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal menghapus'),
  })

  function openAdd() {
    setEditing(null)
    setForm(defaultForm)
    setModalOpen(true)
  }

  function openEdit(record) {
    setEditing(record)
    setForm({ appointment_id: record.appointment_id, diagnosis: record.diagnosis, treatment: record.treatment, notes: record.notes })
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

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Rekam Medis</h1>
          <p className="mt-0.5 text-sm text-gray-500 sm:mt-1">Kelola rekam medis pasien</p>
        </div>
        <Button onClick={openAdd} size="sm" className="self-start sm:self-auto">+ Tambah Rekam Medis</Button>
      </div>

      <Card>
        <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
          <Input placeholder="Cari pasien/diagnosis..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-xs" />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Pasien</TableHeader>
                <TableHeader className="hidden sm:table-cell">Dokter</TableHeader>
                <TableHeader>Diagnosis</TableHeader>
                <TableHeader className="hidden md:table-cell">Treatment</TableHeader>
                <TableHeader className="text-right">Aksi</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center text-gray-400 py-6">Memuat...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center text-gray-400 py-6">Tidak ada data</TableCell></TableRow>
              ) : filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.appointment?.patient?.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{r.appointment?.doctor?.name}</TableCell>
                  <TableCell className="max-w-24 truncate sm:max-w-xs">{r.diagnosis}</TableCell>
                  <TableCell className="hidden max-w-xs truncate md:table-cell">{r.treatment}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 sm:gap-0">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(r)} className="px-2 sm:px-3">
                        <svg className="h-4 w-4 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="px-2 text-red-600 sm:px-3" onClick={() => { if (confirm('Hapus rekam medis ini?')) deleteMutation.mutate(r.id) }}>
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

      <Modal open={modalOpen} onClose={closeModal} title={editing ? 'Edit Rekam Medis' : 'Tambah Rekam Medis'} className="mx-4 max-h-[90vh] overflow-y-auto sm:mx-auto sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <Select label="Janji Temu" value={form.appointment_id} onChange={(e) => setForm({ ...form, appointment_id: e.target.value })} required
            options={[{ value: '', label: 'Pilih Janji Temu...' }, ...appointments.map((a) => ({ value: a.id, label: `${a.patient?.name} - ${a.doctor?.name} (${a.appointment_date})` }))]} />
          <Textarea label="Diagnosis" value={form.diagnosis} onChange={(e) => setForm({ ...form, diagnosis: e.target.value })} required />
          <Textarea label="Treatment" value={form.treatment} onChange={(e) => setForm({ ...form, treatment: e.target.value })} />
          <Textarea label="Catatan" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
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

export default MedicalRecordList
