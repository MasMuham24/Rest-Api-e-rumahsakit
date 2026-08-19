<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MedicalRecord;
use Illuminate\Http\Request;

class MedicalRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medicalRecords = MedicalRecord::with('appointment.patient', 'appointment.doctor', 'creator')->latest()->get();
        return response()->json([
            'success' => true,
            'data' => $medicalRecords,
            'message' => 'Medical Records retrieved successfully'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => ['required', 'exists:appointments,id'],
            'diagnosis' => ['required', 'string'],
            'treatment' => ['required', 'string'],
            'notes' => ['required', 'string']
        ]);

       $validated['created_by'] = auth()->id();
       $medicalRecord = MedicalRecord::create($validated);

        return response()->json([
            'success' => true,
            'data' => $medicalRecord,
            'message' => 'Medical Record created successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $medicalRecord = MedicalRecord::with([
            'appointment.patient',
            'appointment.doctor',
            'creator'
        ])->find($id);

        if (!$medicalRecord) {
            return response()->json([
                'success' => false,
                'message' => 'Medical record not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $medicalRecord,
            'message' => 'Medical record retrieved successfully'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $medicalRecord = MedicalRecord::find($id);

        if (!$medicalRecord) {
            return response()->json([
                'success' => false,
                'message' => 'Medical record not found'
            ], 404);
        }

        $validated = $request->validate([
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $medicalRecord->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Medical record updated successfully',
            'data' => $medicalRecord->fresh()->load([
                'appointment.patient',
                'appointment.doctor',
                'creator'
            ])
        ]);
    }  

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $medicalRecord = MedicalRecord::find($id);

        if (!$medicalRecord) {
            return response()->json([
                'success' => false,
                'message' => 'Medical record not found'
            ], 404);
        }

        $medicalRecord->delete();

        return response()->json([
            'success' => true,
            'message' => 'Medical record deleted successfully'
        ]);
    }
}
