<?php

namespace Database\Seeders;

use App\Models\Prescription;
use App\Models\MedicalRecord;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrescriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $medications = [
            ['name' => 'Paracetamol', 'dosage' => '500mg', 'frequency' => '3x sehari', 'duration' => '7 hari'],
            ['name' => 'Ibuprofen', 'dosage' => '400mg', 'frequency' => '2x sehari', 'duration' => '5 hari'],
            ['name' => 'Amoxicillin', 'dosage' => '500mg', 'frequency' => '3x sehari', 'duration' => '10 hari'],
            ['name' => 'Metformin', 'dosage' => '500mg', 'frequency' => '2x sehari', 'duration' => '30 hari'],
            ['name' => 'Omeprazole', 'dosage' => '20mg', 'frequency' => '1x sehari', 'duration' => '14 hari'],
            ['name' => 'Cetirizine', 'dosage' => '10mg', 'frequency' => '1x sehari', 'duration' => '7 hari'],
            ['name' => 'Vitamin C', 'dosage' => '500mg', 'frequency' => '2x sehari', 'duration' => '30 hari'],
            ['name' => 'Loratadine', 'dosage' => '10mg', 'frequency' => '1x sehari', 'duration' => '14 hari'],
        ];

        $medicalRecords = MedicalRecord::all();
        $doctors = User::where('role', 'admin')->orWhere('role', 'superadmin')->get();

        if ($medicalRecords->isEmpty() || $doctors->isEmpty()) {
            $this->command->info('Skipping PrescriptionSeeder: Medical records atau doctors tidak ditemukan');
            return;
        }

        foreach ($medicalRecords->take(5) as $medicalRecord) {
            $randomMedications = collect($medications)->random(rand(1, 3));
            
            foreach ($randomMedications as $med) {
                Prescription::create([
                    'medical_record_id' => $medicalRecord->id,
                    'medication' => $med['name'],
                    'dosage' => $med['dosage'],
                    'frequency' => $med['frequency'],
                    'duration' => $med['duration'],
                    'notes' => 'Ambil setelah makan. Jangan lewatkan jadwal.',
                    'prescribed_by' => $doctors->random()->id,
                ]);
            }
        }

        $this->command->info('PrescriptionSeeder berhasil dijalankan!');
    }
}

