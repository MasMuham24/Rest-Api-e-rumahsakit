<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash as FacadesHash;

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
            'password' => FacadesHash::make('admin@1234'),
            'role' => 'superadmin'
        ]);
    }
}
