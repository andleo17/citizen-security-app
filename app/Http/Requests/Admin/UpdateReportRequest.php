<?php

namespace App\Http\Requests\Admin;

use App\Models\ReportSubCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateReportRequest extends FormRequest
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
      'subCategory' => ['nullable', Rule::exists(ReportSubCategory::class)],
      'state' => 'required|boolean',
    ];
  }
}
