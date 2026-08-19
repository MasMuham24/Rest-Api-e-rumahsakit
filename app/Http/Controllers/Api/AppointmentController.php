<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appoinment = Appointment::with(['patient', 'doctor'])->latest()->get();
        return response()->json([
            'success' => true,
            'message' => 'Appointment data retrieved successfully',
            'data' => $appoinment
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date',
            'complaint' => 'required|string',
        ]);

        $appointment = Appointment::create([
            ...$validated,
            'status' => 'pending',
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Appointment created successfully',
            'data' => $appointment,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $appointment = Appointment::with([
            'patient',
            'doctor'
        ])->find($id);

        if (! $appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Appointment data retrieved successfully',
            'data' => $appointment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $appointment = Appointment::find($id);

    if (! $appointment) {
        return response()->json([
            'success' => false,
            'message' => 'Appointment not found'
        ], 404);
    }

    $validated = $request->validate([
        'patient_id' => 'required|exists:patients,id',
        'doctor_id' => 'required|exists:doctors,id',
        'appointment_date' => 'required|date',
        'complaint' => 'required|string',
        'status' => 'required|in:pending,approve,completed,canceled',
    ]);

    $appointment->update($validated);

    return response()->json([
        'success' => true,
        'message' => 'Appointment updated successfully',
        'data' => $appointment->fresh(),
    ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $appointment = Appointment::find($id);

        if (! $appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found'
            ], 404);
        }

        $appointment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Appointment deleted successfully'
        ], 200);
    }
}
