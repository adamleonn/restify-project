<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\resetPassword;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    // REGISTER
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => 2
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Register berhasil',
            'user' => $user,
            'token' => $token
        ], 201);
    }


    // LOGIN
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email atau password salah'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'user' => $user,
            'token' => $token
        ]);
    }


    //Untuk Melihat Profile
    public function profile(Request $request)
    {
    return response()->json([
        'user' => $request->user()
        ]);
    }


    // UPLOAD PROFILE PICTURE
    public function uploadProfile(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $user = auth()->user();

        // hapus foto lama jika ada
        if ($user->profile_picture) {

            $oldPath = public_path('storage/' . $user->profile_picture);

            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        // simpan foto baru
        $path = $request->file('profile_picture')
            ->store('profiles', 'public');

        // update user
        $user->update([
            'profile_picture' => $path
        ]);

        return response()->json([
            'message' => 'Foto profile berhasil diupload',
            'profile_picture' => $path,
            'image_url' => asset('storage/' . $path)
        ]);
    }


    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil'
        ]);
    }

    // FORGOT PASSWORD
    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Email tidak ditemukan'
            ], 404);
        }

        $token = Str::random(60);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'email' => $request->email,
                'token' => Hash::make($token),
                'created_at' => now()
            ]
        );

        return response()->json([
            'message' => 'Token reset password berhasil dibuat',
            'token' => $token
        ]);
    }

    // RESET PASSWORD
    public function resetPassword(resetPassword $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:6|confirmed'
        ]);

        $reset = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (!$reset) {
            return response()->json([
                'message' => 'Token reset tidak ditemukan'
            ], 404);
        }

        if (!Hash::check($request->token, $reset->token)) {
            return response()->json([
                'message' => 'Token tidak valid'
            ], 400);
        }

        $user = User::where('email', $request->email)->first();

        $user->update([
            'password' => Hash::make($request->password)
        ]);

        DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->delete();

        return response()->json([
            'message' => 'Password berhasil direset'
        ]);
    }
}