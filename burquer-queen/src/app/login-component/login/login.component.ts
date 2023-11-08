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
  errorMessage!: string;
  form: FormGroup; // Define un FormGroup para el formulario
  email: string = ''; // Añade esta línea para mantener el valor del correo electrónico
  password: string = ''; // Añade esta línea para mantener el valor de la contraseña

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.errorMessage = '';

    const emailControl = this.form.get('email');

    if (emailControl) { // Comprueba si emailControl no es nulo
      if (emailControl.hasError('required') && (emailControl.dirty || emailControl.touched)) {
        // El correo electrónico es requerido
      }
    }

    const credentials = {
      email: this.email,
      password: this.password
    };


    this.loginService.loginUsersCredential(credentials.email, credentials.password)
      .subscribe({
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
            // Manejar otros casos, como usuarios no autenticados o con roles desconocidos
          }
        },
        error: (error) => {
          this.errorMessage = error.message; // Muestra el mensaje de error
        }
      });
  }
}
