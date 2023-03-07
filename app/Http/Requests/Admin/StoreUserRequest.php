<?php

namespace App\Http\Requests\Admin;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Enum;

class StoreUserRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, mixed>
   */
  public function rules()
  {
    return [
      'dni' => 'required|string|max:8|unique:' . User::class,
      'name' => 'required|string|max:255',
      'lastname' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:' . User::class,
      'role' => ['required', new Enum(UserRole::class)],
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ];
  }
}
