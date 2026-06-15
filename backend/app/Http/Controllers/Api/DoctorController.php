<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $doctors = Doctor::latest()->get();
        return response()->json([
            'success' => true,
            'data' => $doctors,
        ], 200); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
    'name' => 'required|string|max:255',
    'spesialization' => 'required|string|max:255',
    'sip_number' => 'required|string|max:20',
    'phone' => 'required|string|max:20',
    'email' => 'nullable|email|unique:doctors,email',
    'gender' => 'required|in:male,female', 
    'address' => 'required|string',
]);

        $doctor = Doctor::create($validated);
        return response()->json([
            'success' => true,
            'message' => 'Doctor created successfully',
            'data' => $doctor,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $doctor = Doctor::find($id);
        if(!$doctor) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Doctor data retrieved successfully',
            'data' => $doctor,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $doctor = Doctor::find($id);
        if(!$doctor) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor not found'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'spesialization' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|unique:doctors,email',
            'gender' => 'required|in:male,female',
            'address' => 'required|string',
        ]);

        $doctor->update($validated);
        return response()->json([
            'success' => true,
            'message' => 'Doctor updated successfully',
            'data' => $doctor->fresh(),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $doctor = Doctor::find($id);
        if(! $doctor) {
            return response()->json([
                'success' => false,
                'message'  => 'Doctor Not Found'
            ], 404);
        }

        $doctor->delete();
        return response()->json([
            'success' => true,
            'message' => 'Doctor deleted successfully',
        ], 200);
    }
}
