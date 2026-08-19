<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'medical_record_id',
        'medication',
        'dosage',
        'frequency',
        'duration',
        'notes',
        'prescribed_by'
    ];

    public function medicalRecord()
    {
        return $this->belongsTo(MedicalRecord::class);
    }

    public function prescriber()
    {
        return $this->belongsTo(User::class, 'prescribed_by');
    }
}
