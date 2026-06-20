import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import Button from '../../components/ui/button'
import Input from '../../components/ui/input'
import Select from '../../components/ui/select'
import Modal from '../../components/ui/modal'
import Badge from '../../components/ui/badge'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../components/ui/table'
import { toast } from '../../lib/toast'

const defaultForm = { name: '', spesialization: '', sip_number: '', phone: '', email: '', address: '', status: 'active' }

function DoctorList() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(defaultForm)

  const { data, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => api.get('/doctors').then((r) => r.data),
  })

  const doctors = data?.data || []
  const filtered = doctors.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase())
  )

  const createMutation = useMutation({
    mutationFn: (body) => api.post('/doctors', body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['doctors'] }); toast.success('Dokter berhasil ditambahkan'); closeModal() },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal menyimpan'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => api.put(`/doctors/${id}`, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['doctors'] }); toast.success('Dokter berhasil diupdate'); closeModal() },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal mengupdate'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/doctors/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['doctors'] }); toast.success('Dokter berhasil dihapus') },
    onError: (err) => toast.error(err.response?.data?.message || 'Gagal menghapus'),
  })

  function openAdd() {
    setEditing(null)
    setForm(defaultForm)
    setModalOpen(true)
  }

  function openEdit(doctor) {
    setEditing(doctor)
    setForm({ name: doctor.name, spesialization: doctor.spesialization, sip_number: doctor.sip_number, phone: doctor.phone, email: doctor.email, address: doctor.address, status: doctor.status })
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
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Data Dokter</h1>
          <p className="mt-0.5 text-sm text-gray-500 sm:mt-1">Kelola data dokter rumah sakit</p>
        </div>
        <Button onClick={openAdd} size="sm" className="self-start sm:self-auto sm:w-auto">+ Tambah Dokter</Button>
      </div>

      <Card>
        <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
          <Input placeholder="Cari dokter..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-xs" />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Nama</TableHeader>
                <TableHeader className="hidden sm:table-cell">Spesialisasi</TableHeader>
                <TableHeader className="hidden md:table-cell">No. SIP</TableHeader>
                <TableHeader className="hidden sm:table-cell">Telepon</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader className="text-right">Aksi</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center text-gray-400 py-6">Memuat...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center text-gray-400 py-6">Tidak ada data</TableCell></TableRow>
              ) : filtered.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{doc.spesialization}</TableCell>
                  <TableCell className="hidden md:table-cell">{doc.sip_number}</TableCell>
                  <TableCell className="hidden sm:table-cell">{doc.phone}</TableCell>
                  <TableCell>
                    <Badge variant={doc.status === 'active' ? 'success' : 'danger'}>{doc.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 sm:gap-0">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(doc)} className="px-2 sm:px-3">
                        <svg className="h-4 w-4 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="px-2 text-red-600 sm:px-3" onClick={() => { if (confirm('Hapus dokter ini?')) deleteMutation.mutate(doc.id) }}>
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

      <Modal open={modalOpen} onClose={closeModal} title={editing ? 'Edit Dokter' : 'Tambah Dokter'} className="mx-4 max-h-[90vh] overflow-y-auto sm:mx-auto sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <Input label="Nama Lengkap" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Spesialisasi" value={form.spesialization} onChange={(e) => setForm({ ...form, spesialization: e.target.value })} required />
          <Input label="Nomor SIP" value={form.sip_number} onChange={(e) => setForm({ ...form, sip_number: e.target.value })} required />
          <Input label="Telepon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Alamat" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} options={[{ value: 'active', label: 'Aktif' }, { value: 'inactive', label: 'Non-Aktif' }]} />
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

export default DoctorList
