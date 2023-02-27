<?php

namespace App\Console\Commands;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateUserAdmin extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'make:admin-user';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Create an admin user';

  /**
   * Execute the console command.
   *
   * @return int
   */
  public function handle(): int
  {
    $dni = $this->ask('DNI');
    $name = $this->ask('Nombres');
    $lastname = $this->ask('Apellidos');
    $email = $this->ask('Correo');

    $passwordMatch = false;

    while (!$passwordMatch) {
      $password = $this->secret('Contraseña');
      $passwordConfirmation = $this->secret('Confirma la contraseña');

      if ($password === $passwordConfirmation) $passwordMatch = true;
      if (!$passwordMatch) $this->info('Las contraseñas no coinciden');
    }

    $password = Hash::make($password);

    $user = new User();
    $user->dni = $dni;
    $user->name = $name;
    $user->lastname = $lastname;
    $user->email = $email;
    $user->password = $password;
    $user->role = UserRole::Admin;

    $user->save();

    $this->info('Administrador creado correctamente');

    return Command::SUCCESS;
  }
}
