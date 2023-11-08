import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginUser } from 'src/app/Interface/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  loginUsersCredential(email:string,password:string):Observable<loginUser>{
    const credencials = {
      email: email,
      password:password
    };
    return this.http.post<loginUser>(`${this.apiUrl}/login`,credencials);
  }

  getUserRole(): string | null {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.role; // Suponiendo que el rol del usuario está en una propiedad llamada "role" en los datos del usuario
    }
    return null;
  }




}

