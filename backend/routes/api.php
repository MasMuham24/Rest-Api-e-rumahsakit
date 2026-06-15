<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\MedicalRecordController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\PrescriptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function() {
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
}); 

Route::middleware(['auth:sanctum', 'role:superadmin'])->prefix('admin')->group(function() {
    Route::post('/', [AdminController::class, 'store']);
    Route::get('/', [AdminController::class, 'index']);
    Route::get('/{user}', [AdminController::class, 'show']);
    Route::put('/{user}', [AdminController::class, 'update']);
    Route::delete('/{user}', [AdminController::class, 'destroy']);
});

Route::prefix('doctors')->middleware(['auth:sanctum', 'role:superadmin,admin'])->group(function() {
    Route::get('/', [DoctorController::class, 'index']);
    Route::post('/', [DoctorController::class, 'store']);
    Route::get('/{id}', [DoctorController::class, 'show']);
    Route::put('/{id}', [DoctorController::class, 'update']);
    Route::delete('/{id}', [DoctorController::class, 'destroy']);
});

Route::prefix('patients')->middleware(['auth:sanctum', 'role:superadmin,admin'])->group(function() {
    Route::get('/', [PatientController::class, 'index']);
    Route::post('/', [PatientController::class, 'store']);
    Route::get('/{id}', [PatientController::class, 'show']);
    Route::put('/{id}', [PatientController::class, 'update']);
    Route::delete('/{id}', [PatientController::class, 'destroy']);
});

Route::prefix('appointments')->middleware(['auth:sanctum', 'role:superadmin,admin'])->group(function() {
    Route::get('/', [AppointmentController::class, 'index']);
    Route::post('/', [AppointmentController::class, 'store']);
    Route::get('/{id}', [AppointmentController::class, 'show']);
    Route::put('/{id}', [AppointmentController::class, 'update']);
    Route::delete('/{id}', [AppointmentController::class, 'destroy']);
});

Route::prefix('medical-record')->middleware('auth:sanctum')->group(function() {
    Route::get('/', [MedicalRecordController::class, 'index']);
    Route::post('/', [MedicalRecordController::class, 'store']);
    Route::get('/{id}', [MedicalRecordController::class, 'show']);
    Route::put('/{id}', [MedicalRecordController::class, 'update']);
    Route::delete('/{id}', [MedicalRecordController::class, 'destroy']);
});

Route::prefix('prescriptions')->middleware(['auth:sanctum', 'role:superadmin,admin'])->group(function() {
    Route::get('/', [PrescriptionController::class, 'index']);
    Route::post('/', [PrescriptionController::class, 'store']);
    Route::get('/{id}', [PrescriptionController::class, 'show']);
    Route::put('/{id}', [PrescriptionController::class, 'update']);
    Route::delete('/{id}', [PrescriptionController::class, 'destroy']);
});