<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateReportCategoryRequest extends FormRequest
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
      'name' => 'string|required',
      'description' => 'string|nullable',
      'subCategories' => 'array',
      'subCategories.*.name' => 'string|required',
      'subCategories.*.description' => 'string|nullable',
    ];
  }
}
