<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prescription;
use App\Models\MedicalRecord;
use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    public function index()
    {
        $prescriptions = Prescription::with(['medicalRecord', 'prescriber'])->latest()->get();
        return response()->json([
            'success' => true,
            'message' => 'Prescription data retrieved successfully',
            'data' => $prescriptions
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'medical_record_id' => 'required|exists:medical_records,id',
            'medication' => 'required|string|max:255',
            'dosage' => 'required|string|max:100',
            'frequency' => 'required|string|max:100',
            'duration' => 'required|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $prescription = Prescription::create([
            ...$validated,
            'prescribed_by' => auth()->id(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Prescription created successfully',
            'data' => $prescription->load(['medicalRecord', 'prescriber']),
        ], 201);
    }

    public function show(string $id)
    {
        $prescription = Prescription::with(['medicalRecord', 'prescriber'])->find($id);
        
        if (!$prescription) {
            return response()->json([
                'success' => false,
                'message' => 'Prescription not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Prescription data retrieved successfully',
            'data' => $prescription
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $prescription = Prescription::find($id);
        
        if (!$prescription) {
            return response()->json([
                'success' => false,
                'message' => 'Prescription not found'
            ], 404);
        }

        $validated = $request->validate([
            'medical_record_id' => 'required|exists:medical_records,id',
            'medication' => 'required|string|max:255',
            'dosage' => 'required|string|max:100',
            'frequency' => 'required|string|max:100',
            'duration' => 'required|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $prescription->update($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Prescription updated successfully',
            'data' => $prescription->fresh()->load(['medicalRecord', 'prescriber']),
        ], 200);
    }

    public function destroy(string $id)
    {
        $prescription = Prescription::find($id);
        
        if (!$prescription) {
            return response()->json([
                'success' => false,
                'message' => 'Prescription not found'
            ], 404);
        }

        $prescription->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Prescription deleted successfully',
        ], 200);
    }
}
