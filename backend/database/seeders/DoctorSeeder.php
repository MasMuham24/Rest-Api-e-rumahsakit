<?php

namespace Database\Seeders;

use App\Models\Doctor;
use Illuminate\Database\Seeder;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        $doctors = [
            [
                'name' => 'dr. Budi Santoso',
                'spesialization' => 'Penyakit Dalam',
                'phone' => '081200000001',
                'email' => 'budi@hospital.com',
                'gender' => 'L',
                'address' => 'Semarang',
            ],
            [
                'name' => 'dr. Siti Rahmawati',
                'spesialization' => 'Anak',
                'phone' => '081200000002',
                'email' => 'siti@hospital.com',
                'gender' => 'P',
                'address' => 'Semarang',
            ],
            [
                'name' => 'dr. Ahmad Fauzi',
                'spesialization' => 'Jantung',
                'phone' => '081200000003',
                'email' => 'ahmad@hospital.com',
                'gender' => 'L',
                'address' => 'Demak',
            ],
            [
                'name' => 'dr. Dewi Lestari',
                'spesialization' => 'Kulit dan Kelamin',
                'phone' => '081200000004',
                'email' => 'dewi@hospital.com',
                'gender' => 'P',
                'address' => 'Kudus',
            ],
            [
                'name' => 'dr. Rizky Pratama',
                'spesialization' => 'Saraf',
                'phone' => '081200000005',
                'email' => 'rizky@hospital.com',
                'gender' => 'L',
                'address' => 'Jepara',
            ],
            [
                'name' => 'dr. Nabila Putri',
                'spesialization' => 'THT',
                'phone' => '081200000006',
                'email' => 'nabila@hospital.com',
                'gender' => 'P',
                'address' => 'Salatiga',
            ],
            [
                'name' => 'dr. Andi Saputra',
                'spesialization' => 'Mata',
                'phone' => '081200000007',
                'email' => 'andi@hospital.com',
                'gender' => 'L',
                'address' => 'Kendal',
            ],
            [
                'name' => 'dr. Lina Marlina',
                'spesialization' => 'Paru',
                'phone' => '081200000008',
                'email' => 'lina@hospital.com',
                'gender' => 'P',
                'address' => 'Purwodadi',
            ],
            [
                'name' => 'dr. Fajar Nugroho',
                'spesialization' => 'Bedah Umum',
                'phone' => '081200000009',
                'email' => 'fajar@hospital.com',
                'gender' => 'L',
                'address' => 'Semarang',
            ],
            [
                'name' => 'dr. Putri Maharani',
                'spesialization' => 'Obstetri dan Ginekologi',
                'phone' => '081200000010',
                'email' => 'putri@hospital.com',
                'gender' => 'P',
                'address' => 'Semarang',
            ],
            [
                'name' => 'dr. Yoga Prasetyo',
                'spesialization' => 'Ortopedi',
                'phone' => '081200000011',
                'email' => 'yoga@hospital.com',
                'gender' => 'L',
                'address' => 'Demak',
            ],
            [
                'name' => 'dr. Amelia Safitri',
                'spesialization' => 'Urologi',
                'phone' => '081200000012',
                'email' => 'amelia@hospital.com',
                'gender' => 'P',
                'address' => 'Kudus',
            ],
            [
                'name' => 'dr. Dimas Haryanto',
                'spesialization' => 'Psikiatri',
                'phone' => '081200000013',
                'email' => 'dimas@hospital.com',
                'gender' => 'L',
                'address' => 'Jepara',
            ],
            [
                'name' => 'dr. Rina Kusuma',
                'spesialization' => 'Radiologi',
                'phone' => '081200000014',
                'email' => 'rina@hospital.com',
                'gender' => 'P',
                'address' => 'Salatiga',
            ],
            [
                'name' => 'dr. Arif Setiawan',
                'spesialization' => 'Neurologi',
                'phone' => '081200000015',
                'email' => 'arif@hospital.com',
                'gender' => 'L',
                'address' => 'Semarang',
            ],
        ];

         foreach ($doctors as $index => $doctor) {
        Doctor::create([
        'sip_number' => 'SIP-' . date('Y') . '-' . str_pad($index + 1, 4, '0', STR_PAD_LEFT),
        'gender' => $doctor['gender'] === 'L' ? 'male' : 'female',
        ...collect($doctor)->except('gender')->toArray(),
    ]);
}
    }
}