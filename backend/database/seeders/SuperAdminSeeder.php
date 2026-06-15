<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate([
            'email' => 'Superadmin@gmail.com'
        ], [
            'name' => 'Super Admin',
            'password' => Hash::make('admin@1234'),
            'role' => 'superadmin'
        ]);
    }
}
