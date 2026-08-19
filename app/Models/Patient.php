<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory; 
    protected $fillable = [
        'medical_record_number',
        'name',
        'nik',
        'birth_date',
        'gender',
        'phone',
        'address',
        'blood_type',
    ];
}
