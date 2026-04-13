<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role_id' => 'required|exists:roles,id',
            'hotel_id' => 'nullable|exists:hotels,id',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {

            // role_id = 3 (receptionist)
            if ($this->role_id == 3 && empty($this->hotel_id)) {
                $validator->errors()->add(
                    'hotel_id',
                    'Receptionist wajib memiliki hotel_id'
                );
            }

        });
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi',
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah digunakan',

            'password.required' => 'Password wajib diisi',
            'password.min' => 'Password minimal 6 karakter',

            'role_id.required' => 'Role wajib diisi',
            'role_id.exists' => 'Role tidak valid',

            'hotel_id.exists' => 'Hotel tidak ditemukan',
        ];
    }
}