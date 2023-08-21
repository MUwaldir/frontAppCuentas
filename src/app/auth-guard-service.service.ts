import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import axios from 'axios';
import { AuthService } from './auth.service';
import { environment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  apiUrl : string = environment.apiUrl

  constructor(private router: Router, private authService: AuthService) { }

  async canActivate(): Promise<boolean> {
    if (this.authService.loggedIn) {
      // Si el usuario está logueado, permitir el acceso a la ruta protegida
      return true;
    } else {
      // Obtener el token del localStorage
      const token = localStorage.getItem('token');

      if (token) {
        // Realizar la solicitud HTTP al backend para verificar el token
        try {
          const response: any = await axios.post(`${this.apiUrl}/validar-token`, { token });
          if (response.data.valid) {
            // El token es válido, establecer el estado de inicio de sesión como verdadero
       
            return true;
          }
        } catch (error) {
          // El token no es válido o hubo un error al verificarlo, redirigir a la página de inicio
          this.router.navigate(['./']);
          return false;
        }
      }

      // Si no hay token o el token no es válido, redirigir a la página de inicio
      this.router.navigate(['./']);
      return false;
    }
  }
}
