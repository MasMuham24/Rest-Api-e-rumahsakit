<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\DoctorSchedule;
use Illuminate\Database\Seeder;

class DoctorScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $doctors = Doctor::all();

        if ($doctors->isEmpty()) {
            $this->command->warn('No doctors found. Please seed doctors first.');

            return;
        }

        $schedules = [
            [
                'day' => 'monday',
                'start_time' => '08:00',
                'end_time' => '12:00',
            ],
            [
                'day' => 'tuesday',
                'start_time' => '13:00',
                'end_time' => '17:00',
            ],
            [
                'day' => 'wednesday',
                'start_time' => '08:00',
                'end_time' => '12:00',
            ],
            [
                'day' => 'thursday',
                'start_time' => '13:00',
                'end_time' => '17:00',
            ],
            [
                'day' => 'friday',
                'start_time' => '08:00',
                'end_time' => '12:00',
            ],
        ];

        foreach ($doctors as $doctor) {
            foreach ($schedules as $schedule) {
                DoctorSchedule::updateOrCreate(
                    [
                        'doctor_id' => $doctor->id,
                        'day' => $schedule['day'],
                    ],
                    [
                        'start_time' => $schedule['start_time'],
                        'end_time' => $schedule['end_time'],
                        'is_active' => true,
                    ]
                );
            }
        }

        $this->command->info(
            "Doctor schedules seeded successfully for {$doctors->count()} doctors."
        );
    }
}
