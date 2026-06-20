import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import Button from '../../components/ui/button'
import Input from '../../components/ui/input'
import Select from '../../components/ui/select'
import Modal from '../../components/ui/modal'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../components/ui/table'
import { toast } from '../../lib/toast'

const defaultForm = { medical_record_number: '', name: '', nik: '', birth_date: '', gender: 'male', phone: '', address: '', blood_type: '' }

function PatientList() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(defaultForm)

  const { data, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: () => api.get('/patients').then((r) => r.data),
  })

  const patients = data?.data || []
  const filtered = patients.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) || p.medical_record_number?.toLowerCase().includes(search.toLowerCase())
  )

  const createMutation = useMutation({
    mutationFn: (body) => api.post('/patients', body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['patients'] }); toast.success('Pasien berhasil ditambahkan'); closeModal() },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal menyimpan'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/patients/${id}`, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['patients'] }); toast.success('Pasien berhasil diupdate'); closeModal() },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal mengupdate'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/patients/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['patients'] }); toast.success('Pasien berhasil dihapus') },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal menghapus'),
  })

  function openAdd() {
    setEditing(null)
    setForm(defaultForm)
    setModalOpen(true)
  }

  function openEdit(patient) {
    setEditing(patient)
    setForm({
      medical_record_number: patient.medical_record_number,
      name: patient.name,
      nik: patient.nik,
      birth_date: patient.birth_date,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      blood_type: patient.blood_type,
    })
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
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Data Pasien</h1>
          <p className="mt-0.5 text-sm text-gray-500 sm:mt-1">Kelola data pasien rumah sakit</p>
        </div>
        <Button onClick={openAdd} size="sm" className="self-start sm:self-auto">+ Tambah Pasien</Button>
      </div>

      <Card>
        <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
          <Input placeholder="Cari nama atau No. RM..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-xs" />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>No. RM</TableHeader>
                <TableHeader>Nama</TableHeader>
                <TableHeader className="hidden sm:table-cell">NIK</TableHeader>
                <TableHeader className="hidden md:table-cell">Jenis Kelamin</TableHeader>
                <TableHeader className="hidden sm:table-cell">Telepon</TableHeader>
                <TableHeader className="hidden lg:table-cell">Gol. Darah</TableHeader>
                <TableHeader className="text-right">Aksi</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={7} className="text-center text-gray-400 py-6">Memuat...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center text-gray-400 py-6">Tidak ada data</TableCell></TableRow>
              ) : filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.medical_record_number}</TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{p.nik}</TableCell>
                  <TableCell className="hidden md:table-cell">{p.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</TableCell>
                  <TableCell className="hidden sm:table-cell">{p.phone}</TableCell>
                  <TableCell className="hidden lg:table-cell">{p.blood_type || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 sm:gap-0">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(p)} className="px-2 sm:px-3">
                        <svg className="h-4 w-4 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="px-2 text-red-600 sm:px-3" onClick={() => { if (confirm('Hapus pasien ini?')) deleteMutation.mutate(p.id) }}>
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

      <Modal open={modalOpen} onClose={closeModal} title={editing ? 'Edit Pasien' : 'Tambah Pasien'} className="mx-4 max-h-[90vh] overflow-y-auto sm:mx-auto sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <Input label="No. Rekam Medis" value={form.medical_record_number} onChange={(e) => setForm({ ...form, medical_record_number: e.target.value })} required />
          <Input label="Nama Lengkap" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="NIK" value={form.nik} onChange={(e) => setForm({ ...form, nik: e.target.value })} required />
          <Input label="Tanggal Lahir" type="date" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })} />
          <Select label="Jenis Kelamin" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} options={[{ value: 'male', label: 'Laki-laki' }, { value: 'female', label: 'Perempuan' }]} />
          <Input label="Telepon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input label="Alamat" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <Select label="Golongan Darah" value={form.blood_type} onChange={(e) => setForm({ ...form, blood_type: e.target.value })} options={[{ value: '', label: 'Pilih...' }, { value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'AB', label: 'AB' }, { value: 'O', label: 'O' }]} />
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

export default PatientList
