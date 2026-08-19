<?php

namespace Database\Seeders;

use App\Models\MedicalRecord;
use App\Models\Appointment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicalRecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $diagnoses = [
            'Demam berdarah dengue',
            'Infeksi saluran pernapasan akut',
            'Gastroenteritis',
            'Hipertensi stage 1',
            'Diabetes melitus tipe 2',
            'Alergi rhinitis',
            'Migraine kronik',
            'Asma bronkial',
        ];

        $treatments = [
            'Istirahat, minum air putih, dan konsumsi parasetamol',
            'Antibiotik spectrum luas dan ekspektoran',
            'Rehidrasi dan diet makanan ringan',
            'Antihipertensi dan diet rendah garam',
            'Metformin dan lifestyle modification',
            'Antihistamin dan irigasi hidung',
            'Analgesik dan istirahat di tempat gelap',
            'Inhaler dan nebulizer sesuai kebutuhan',
        ];

        $appointments = Appointment::where('status', 'completed')->get();
        $doctors = User::where('role', 'admin')->orWhere('role', 'superadmin')->get();

        if ($appointments->isEmpty() || $doctors->isEmpty()) {
            $this->command->info('Skipping MedicalRecordSeeder: Completed appointments atau doctors tidak ditemukan');
            return;
        }

        foreach ($appointments->take(8) as $appointment) {
            MedicalRecord::create([
                'appointment_id' => $appointment->id,
                'diagnosis' => $diagnoses[array_rand($diagnoses)],
                'treatment' => $treatments[array_rand($treatments)],
                'notes' => 'Pasien dalam kondisi stabil. Follow up 1 minggu.',
                'created_by' => $doctors->random()->id,
            ]);
        }

        $this->command->info('MedicalRecordSeeder berhasil dijalankan!');
    }
}

