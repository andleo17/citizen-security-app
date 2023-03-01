<?php

namespace App\Enums;

/** @typescript **/
enum UserRole: string
{
  case Citizen = 'Citizen';
  case Police = 'Police';
  case Admin = 'Admin';
}
