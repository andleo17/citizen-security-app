<?php

namespace App\Enums;

enum UserRole: string
{
  case Citizen = 'Citizen';
  case Police = 'Police';
  case Admin = 'Admin';
}
