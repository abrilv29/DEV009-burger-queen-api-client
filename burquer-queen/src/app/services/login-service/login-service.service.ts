import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginUser } from 'src/app/Interface/login.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,private router: Router) {}

  loginUsersCredential(email: string, password: string): Observable<loginUser> {
    const credentials = {
      email: email,
      password: password
    };
    return this.http.post<loginUser>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: loginUser) => {
        // Almacenar el token en el almacenamiento local.
        sessionStorage.setItem('accessToken', response.accessToken);
        console.log(response.accessToken);
      })
    );
  }
  logout() {
    // Elimina la información de usuario almacenada en sessionStorage
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('accessToken');
    
    // Redirige al usuario a la página de inicio de sesión u otra página de tu elección
    this.router.navigate(['/login']); // Asegúrate de importar el servicio Router en tu componente
  }
  
}