<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Database\Seeder;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
        $patients = Patient::all();
        $doctors = Doctor::all();

        if ($patients->isEmpty() || $doctors->isEmpty()) {
            $this->command->warn('Patient atau Doctor belum tersedia!');
            return;
        }

        $complaints = [
            'Demam tinggi selama 3 hari',
            'Batuk dan pilek',
            'Sakit kepala berkepanjangan',
            'Nyeri lambung',
            'Sesak napas ringan',
            'Kontrol kesehatan rutin',
            'Nyeri sendi',
            'Pemeriksaan tekanan darah',
        ];

        for ($i = 0; $i < 10; $i++) {
            Appointment::create([
                'patient_id' => $patients->random()->id,
                'doctor_id' => $doctors->random()->id,
                'appointment_date' => now()->addDays(rand(1, 30)),
                'complaint' => $complaints[array_rand($complaints)],
                'status' => collect([
                    'pending',
                    'approve',
                    'completed',
                    'canceled'
                ])->random(),
            ]);
        }
    }
}