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

const defaultForm = { medical_record_id: '', medication: '', dosage: '', frequency: '', duration: '', notes: '' }

function PrescriptionList() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(defaultForm)

  const { data, isLoading } = useQuery({
    queryKey: ['prescriptions'],
    queryFn: () => api.get('/prescriptions').then((r) => r.data),
  })

  const { data: mrData } = useQuery({
    queryKey: ['medical-records-options-px'],
    queryFn: () => api.get('/medical-record').then((r) => r.data),
  })

  const prescriptions = data?.data || []
  const medicalRecords = mrData?.data || []

  const filtered = prescriptions.filter((p) =>
    p.medication?.toLowerCase().includes(search.toLowerCase()) ||
    p.medicalRecord?.appointment?.patient?.name?.toLowerCase().includes(search.toLowerCase())
  )

  const createMutation = useMutation({
    mutationFn: (body) => api.post('/prescriptions', body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['prescriptions'] }); toast.success('Resep berhasil ditambahkan'); closeModal() },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal menyimpan'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/prescriptions/${id}`, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['prescriptions'] }); toast.success('Resep berhasil diupdate'); closeModal() },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal mengupdate'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/prescriptions/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['prescriptions'] }); toast.success('Resep berhasil dihapus') },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal menghapus'),
  })

  function openAdd() {
    setEditing(null)
    setForm(defaultForm)
    setModalOpen(true)
  }

  function openEdit(prescription) {
    setEditing(prescription)
    setForm({ medical_record_id: prescription.medical_record_id, medication: prescription.medication, dosage: prescription.dosage, frequency: prescription.frequency, duration: prescription.duration, notes: prescription.notes })
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
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Resep Obat</h1>
          <p className="mt-0.5 text-sm text-gray-500 sm:mt-1">Kelola resep obat pasien</p>
        </div>
        <Button onClick={openAdd} size="sm" className="self-start sm:self-auto">+ Tambah Resep</Button>
      </div>

      <Card>
        <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
          <Input placeholder="Cari obat/pasien..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-xs" />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader className="hidden sm:table-cell">Pasien</TableHeader>
                <TableHeader>Obat</TableHeader>
                <TableHeader className="hidden sm:table-cell">Dosis</TableHeader>
                <TableHeader className="hidden md:table-cell">Frekuensi</TableHeader>
                <TableHeader className="hidden md:table-cell">Durasi</TableHeader>
                <TableHeader className="text-right">Aksi</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center text-gray-400 py-6">Memuat...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center text-gray-400 py-6">Tidak ada data</TableCell></TableRow>
              ) : filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="hidden font-medium sm:table-cell">{p.medicalRecord?.appointment?.patient?.name}</TableCell>
                  <TableCell>{p.medication}</TableCell>
                  <TableCell className="hidden sm:table-cell">{p.dosage}</TableCell>
                  <TableCell className="hidden md:table-cell">{p.frequency}</TableCell>
                  <TableCell className="hidden md:table-cell">{p.duration}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 sm:gap-0">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(p)} className="px-2 sm:px-3">
                        <svg className="h-4 w-4 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="px-2 text-red-600 sm:px-3" onClick={() => { if (confirm('Hapus resep ini?')) deleteMutation.mutate(p.id) }}>
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

      <Modal open={modalOpen} onClose={closeModal} title={editing ? 'Edit Resep' : 'Tambah Resep'} className="mx-4 max-h-[90vh] overflow-y-auto sm:mx-auto sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <Select label="Rekam Medis" value={form.medical_record_id} onChange={(e) => setForm({ ...form, medical_record_id: e.target.value })} required
            options={[{ value: '', label: 'Pilih Rekam Medis...' }, ...medicalRecords.map((r) => ({ value: r.id, label: `${r.appointment?.patient?.name} - ${r.diagnosis}` }))]} />
          <Input label="Nama Obat" value={form.medication} onChange={(e) => setForm({ ...form, medication: e.target.value })} required />
          <Input label="Dosis" value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} placeholder="mis: 500mg" />
          <Input label="Frekuensi" value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })} placeholder="mis: 3x sehari" />
          <Input label="Durasi" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="mis: 7 hari" />
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

export default PrescriptionList
