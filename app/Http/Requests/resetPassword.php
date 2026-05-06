<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class resetPassword extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:6|confirmed'
        ];
    }
}