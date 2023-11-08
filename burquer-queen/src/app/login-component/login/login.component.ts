import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { loginUser } from 'src/app/Interface/login.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Debes construir un formulario FormGroup en tu componente.

  constructor(private formBuilder: FormBuilder, private LoginServiceService: LoginServiceService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required], // Campo de correo electrónico
      password: ['', Validators.required], // Campo de contraseña
    });
  }

  errorMessage: string = '';
  attrsToShowPassword = {
    inputPasswordType: 'password',
  };

  login() {
    if (this.loginForm.invalid) {
      // Validación adicional, por ejemplo, mostrar un mensaje de error si los campos están vacíos.
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');

    if (emailControl && passwordControl) {
      const email = emailControl.value;
      const password = passwordControl.value;

      this.LoginServiceService.loginUsersCredential(email, password).subscribe({
        next: (response: loginUser) => {
          // Almacenar la información del usuario y el token en sessionStorage
          sessionStorage.setItem('user', JSON.stringify(response.user));
          sessionStorage.setItem('accessToken', response.accessToken);

          // Obtener el rol del usuario después de iniciar sesión
          const userRole = response.user.role;
          if (userRole === 'admin') {
            this.router.navigate(['/admin-users']);
          } else if (userRole === 'waiter') {
            this.router.navigate(['/mesero-pedidos']);
          } else if (userRole === 'chef') {
            this.router.navigate(['/chef-entregados']);
          } else {
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          if (error.error === 'No se puede encontrar el usuario') {
            this.errorMessage = 'No se puede encontrar el usuario';
          } else if (error.error === 'Constraseña incorrecta') {
            this.errorMessage = 'contraseña correctamente';
          }
        }
      });

      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }

  }//end
}// end class
