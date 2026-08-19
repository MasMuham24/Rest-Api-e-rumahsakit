<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        $patients = [
            [
                'medical_record_number' => 'RM000002',
                'name' => 'Ahmad Kholiqur Rofiq',
                'nik' => '3321110000000001',
                'birth_date' => '2004-11-03',
                'gender' => 'L',
                'phone' => '081234567891',
                'address' => 'Semarang',
                'blood_type' => 'A',
            ],
            [
                'medical_record_number' => 'RM000003',
                'name' => 'Siti Aisyah',    
                'nik' => '3321110000000002',
                'birth_date' => '2000-05-15',
                'gender' => 'P',
                'phone' => '081234567892',
                'address' => 'Demak',
                'blood_type' => 'B',
            ],
            [
                'medical_record_number' => 'RM000004',
                'name' => 'Budi Santoso',
                'nik' => '3321110000000003',
                'birth_date' => '1995-08-10',
                'gender' => 'L',
                'phone' => '081234567893',
                'address' => 'Kudus',
                'blood_type' => 'O',
            ],
            [
                'medical_record_number' => 'RM000005',
                'name' => 'Dewi Lestari',   
                'nik' => '3321110000000004',
                'birth_date' => '1998-03-21',
                'gender' => 'P',
                'phone' => '081234567894',
                'address' => 'Jepara',
                'blood_type' => 'AB',
            ],
            [
                'medical_record_number' => 'RM000006',
                'name' => 'Rizky Pratama',
                'nik' => '3321110000000005',
                'birth_date' => '2001-07-12',
                'gender' => 'L',
                'phone' => '081234567895',
                'address' => 'Semarang',
                'blood_type' => 'A',
            ],
            [
                'medical_record_number' => 'RM000007',
                'name' => 'Nabila Putri',
                'nik' => '3321110000000006',
                'birth_date' => '2002-11-05',
                'gender' => 'P',
                'phone' => '081234567896',
                'address' => 'Salatiga',
                'blood_type' => 'B',
            ],
            [
                'medical_record_number' => 'RM000008',
                'name' => 'Andi Saputra',
                'nik' => '3321110000000007',
                'birth_date' => '1997-06-30',
                'gender' => 'L',
                'phone' => '081234567897',
                'address' => 'Purwodadi',
                'blood_type' => 'O',
            ],
            [
                'medical_record_number' => 'RM000009',
                'name' => 'Lina Marlina',
                'nik' => '3321110000000008',
                'birth_date' => '1996-12-18',
                'gender' => 'P',
                'phone' => '081234567898',
                'address' => 'Kendal',
                'blood_type' => 'AB',
            ],
            [
                'medical_record_number' => 'RM000010',
                'name' => 'Fajar Nugroho',  
                'nik' => '3321110000000009',
                'birth_date' => '2000-02-14',
                'gender' => 'L',
                'phone' => '081234567899',
                'address' => 'Demak',
                'blood_type' => 'A',
            ],
            [
                'medical_record_number' => 'RM000011',
                'name' => 'Putri Maharani',
                'nik' => '3321110000000010',
                'birth_date' => '2003-09-25',
                'gender' => 'P',
                'phone' => '081234567900',
                'address' => 'Semarang',
                'blood_type' => 'O',
            ],
            [
                'medical_record_number' => 'RM000012',
                'name' => 'Rina Sari',
                'nik' => '3321110000000011',
                'birth_date' => '2001-11-22',
                'gender' => 'P',
                'phone' => '081234567911',
                'address' => 'Semarang',
                'blood_type' => 'A',
            ],
        ];

        foreach ($patients as $patient) {
            Patient::create($patient);
        }
    }
}