<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreReportRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return Auth::check();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
   */
  public function rules(): array
  {
    return [
      'description' => 'string|required',
      'location' => 'required',
      'location.lat' => 'required|numeric',
      'location.lng' => 'required|numeric',
      'photos' => 'nullable',
      'photos.*' => 'image',
      'emergency' => 'required|boolean'
    ];
  }
}
