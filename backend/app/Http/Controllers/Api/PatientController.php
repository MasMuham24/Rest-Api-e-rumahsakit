<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::latest()->get();
        return response()->json([
            'success' => true,
            'message' => 'Patient data retrivied successfully',
            'data' => $patients
        ]);
    }

public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'nik' => 'required|string|max:16|unique:patients,nik',
        'birth_date' => 'required|date',
        'gender' => 'required|in:L,P',
        'phone' => 'required|string|max:20',
        'address' => 'required|string',
        'blood_type' => 'required|in:A,B,O,AB',
    ]);

    $lastPatient = Patient::latest()->first();

    $number = $lastPatient
        ? ((int) substr($lastPatient->medical_record_number, 2)) + 1
        : 1;

    $medicalRecordNumber = 'RM' . str_pad($number, 6, '0', STR_PAD_LEFT);

    $patient = Patient::create([
        ...$validated,
        'medical_record_number' => $medicalRecordNumber,
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Patient created successfully',
        'data' => $patient,
    ], 201);
}
    public function show(string $id)
    {
        $patient = Patient::find($id);
        if(! $patient) {
            return response()->json([
                'success' => false,
                'message' => 'Patient not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Patient data retrivied successfully', 
            'data' => $patient
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $patient = Patient::find($id);
        if(! $patient) {
            return response()->json([
                'success' => false,
                'message' => 'Patient not found'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|in:L,P',
            'birth_date' => 'required|date',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'blood_type' => 'required|in:A,B,O,AB',
        ]); 

        $patient->update($validated);
        return response()->json([
            'success' => true,
            'message' => 'Patient updated successfully',
            'data' => $patient->fresh(),
        ], 200);
    }

    public function destroy(string $id)
    {
        $patient = Patient::find($id);
        if(! $patient) {
            return response()->json([
                'success' => false,
                'message' => 'Patient not found'
            ], 404);
        }

        $patient->delete();
        return response()->json([
            'success' => true,
            'message' => 'Patient deleted successfully',
        ], 200);
    }
}
