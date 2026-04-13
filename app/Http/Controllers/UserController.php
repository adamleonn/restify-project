<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;

class UserController extends Controller
{
    // GET ALL USERS
    public function index()
    {
        return response()->json(
            User::with(['role', 'hotel'])->get()
        );
    }

    // GET DETAIL USER
    public function show($id)
    {
        $user = User::with(['role', 'hotel'])->find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan'
            ], 404);
        }

        return response()->json($user);
    }

    // CREATE USER (ADMIN)
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response()->json([
            'message' => 'User berhasil dibuat',
            'data' => $user->load(['role', 'hotel'])
        ], 201);
    }

    // UPDATE USER
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'nullable|min:6',
            'role_id' => 'sometimes|exists:roles,id',
            'hotel_id' => 'nullable|exists:hotels,id'
        ]);

        // kalau receptionist diubah → wajib punya hotel
        if (
            isset($validated['role_id']) &&
            $validated['role_id'] == 3 &&
            empty($validated['hotel_id']) &&
            !$user->hotel_id
        ) {
            return response()->json([
                'message' => 'Receptionist wajib memiliki hotel_id'
            ], 400);
        }

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'message' => 'User berhasil diupdate',
            'data' => $user->load(['role', 'hotel'])
        ]);
    }

    // DELETE USER
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'User berhasil dihapus'
        ]);
    }
}