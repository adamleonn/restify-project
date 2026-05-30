<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    // GET ALL USERS by admin
    public function index()
    {
        $users = User::with([
            'role',
            'hotel'
        ])
        ->latest()
        ->get();

        return response()->json($users);
    }


    // GET DETAIL USER by admin 
    public function show($id)
    {
        $user = User::with([
            'role',
            'hotel'
        ])->find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan'
            ],404);
        }

        return response()->json($user);
    }


    // CREATE USER by admin 
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        // ADMIN TIDAK BOLEH DIBUAT LAGI
        if ($data['role_id'] == 1) {
            return response()->json([
                'message' => 'Tidak dapat membuat admin baru'
            ],403);
        }

        $data['password'] = Hash::make(
            $data['password']
        );

        $user = User::create($data);

        return response()->json([
            'message' => 'User berhasil dibuat',
            'data' => $user->load([
                'role',
                'hotel'
            ])
        ],201);
    }


    // UPDATE USER by admin 
    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan'
            ],404);
        }

        $validated = $request->validated();

        // ADMIN SEEDED TIDAK BOLEH DIUBAH
        if ($user->role_id == 1) {

            return response()->json([
                'message' => 'Role admin tidak dapat diubah'
            ],403);
        }


        // TIDAK BOLEH UBAH USER JADI ADMIN
        if (
            isset($validated['role_id']) &&
            $validated['role_id'] == 1
        ) {

            return response()->json([
                'message' => 'Tidak dapat mengubah user menjadi admin'
            ],403);
        }


        // RECEPTIONIST WAJIB PUNYA HOTEL
        if (
            isset($validated['role_id']) &&
            $validated['role_id'] == 3 &&
            empty($validated['hotel_id']) &&
            !$user->hotel_id
        ) {

            return response()->json([
                'message' => 'Receptionist wajib memiliki hotel_id'
            ],400);
        }


        // HASH PASSWORD JIKA ADA
        if (
            isset($validated['password'])
        ) {

            $validated['password'] =
                Hash::make(
                    $validated['password']
                );
        }

        $user->update($validated);

        return response()->json([
            'message' => 'User berhasil diupdate',
            'data' => $user->fresh()->load([
                'role',
                'hotel'
            ])
        ]);
    }


    // DELETE USER by admin 
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {

            return response()->json([
                'message' => 'User tidak ditemukan'
            ],404);
        }


        // ADMIN SEEDED TIDAK BOLEH DIHAPUS
        if ($user->role_id == 1) {

            return response()->json([
                'message' => 'Admin tidak dapat dihapus'
            ],403);
        }


        $user->delete();

        return response()->json([
            'message' => 'User berhasil dihapus'
        ]);
    }
}