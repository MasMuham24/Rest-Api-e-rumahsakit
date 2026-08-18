<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DoctorSchedule extends Model
{
    protected $fillable = [
        'doctor_id',
        'day',
        'start_time',
        'end_time',
        'is_active',
    ];
    protected $cast = ['is_active' => 'boolean'];
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }

}
