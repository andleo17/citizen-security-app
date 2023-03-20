<?php

namespace App\Http\Requests\Admin;

use App\Models\Car;
use App\Models\User;
use App\Models\Zone;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdatePatrolRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return Auth::user()->isAdmin();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
   */
  public function rules(): array
  {
    return [
      'start_at' => 'required|date',
      'end_at' => 'required|date|after:start_at',
      'route_path' => 'nullable|array',
      'route_path.*.lat' => 'required|numeric',
      'route_path.*.lng' => 'required|numeric',
      'user_id' => ['required', Rule::exists(User::class, 'id')],
      'car_id' => ['required', Rule::exists(Car::class, 'id')],
      'zone_id' => ['required', Rule::exists(Zone::class, 'id')],
      'route_id' => ['nullable', Rule::exists(Route::class, 'id')],
    ];
  }
}
