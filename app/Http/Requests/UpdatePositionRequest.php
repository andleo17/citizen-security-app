<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdatePositionRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    $user = Auth::user();
    return $user->hasRole('Police') || $user->hasRole('Admin');
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
   */
  public function rules(): array
  {
    return [
      'location' => 'required',
      'location.lat' => 'required|numeric',
      'location.lng' => 'required|numeric',
    ];
  }
}
