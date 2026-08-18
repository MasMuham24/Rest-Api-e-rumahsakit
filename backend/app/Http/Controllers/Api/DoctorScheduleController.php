<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDoctorScheduleRequest;
use App\Http\Requests\UpdateDoctorScheduleRequest;
use App\Http\Resources\DoctorScheduleResource;
use App\Models\DoctorSchedule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DoctorScheduleController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $schedules = DoctorSchedule::with('doctor')
            ->orderBy('day')
            ->orderBy('start_time')
            ->paginate(10);

        return DoctorScheduleResource::collection($schedules);
    }

    public function store(StoreDoctorScheduleRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $conflict = DoctorSchedule::where('doctor_id', $validated['doctor_id'])
            ->where('day', $validated['day'])
            ->where('is_active', true)
            ->where(function ($query) use ($validated) {
                $query->where('start_time', '<', $validated['end_time'])
                    ->where('end_time', '>', $validated['start_time']);
            })
            ->exists();

        if ($conflict) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor already has a schedule that conflicts with this time.',
            ], 422);
        }

        $schedule = DoctorSchedule::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Doctor schedule created successfully.',
            'data' => new DoctorScheduleResource(
                $schedule->load('doctor')
            ),
        ], 201);
    }

    public function show(DoctorSchedule $doctorSchedule): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Doctor schedule retrieved successfully.',
            'data' => new DoctorScheduleResource(
                $doctorSchedule->load('doctor')
            ),
        ]);
    }

    public function update(
        UpdateDoctorScheduleRequest $request,
        DoctorSchedule $doctorSchedule
    ): JsonResponse {
        $validated = $request->validated();

        $doctorId = $validated['doctor_id'] ?? $doctorSchedule->doctor_id;
        $day = $validated['day'] ?? $doctorSchedule->day;
        $startTime = $validated['start_time'] ?? $doctorSchedule->start_time;
        $endTime = $validated['end_time'] ?? $doctorSchedule->end_time;
        $isActive = $validated['is_active'] ?? $doctorSchedule->is_active;

        if ($isActive) {
            $conflict = DoctorSchedule::where('doctor_id', $doctorId)
                ->where('day', $day)
                ->where('is_active', true)
                ->where('id', '!=', $doctorSchedule->id)
                ->where(function ($query) use ($startTime, $endTime) {
                    $query->where('start_time', '<', $endTime)
                        ->where('end_time', '>', $startTime);
                })
                ->exists();

            if ($conflict) {
                return response()->json([
                    'success' => false,
                    'message' => 'Doctor already has a schedule that conflicts with this time.',
                ], 422);
            }
        }

        $doctorSchedule->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Doctor schedule updated successfully.',
            'data' => new DoctorScheduleResource(
                $doctorSchedule->fresh()->load('doctor')
            ),
        ]);
    }

    public function destroy(DoctorSchedule $doctorSchedule): JsonResponse
    {
        $doctorSchedule->delete();

        return response()->json([
            'success' => true,
            'message' => 'Doctor schedule deleted successfully.',
        ]);
    }
}
