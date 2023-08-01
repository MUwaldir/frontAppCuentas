import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor() { }

  login(username: string, password: string): boolean {
    // Aquí implementa la lógica para verificar las credenciales de inicio de sesión
    // Puedes comparar las credenciales con una base de datos o utilizar otro método de autenticación

    if (username === 'admin' && password === '12345') {
      // Credenciales válidas, establece el estado de inicio de sesión como verdadero
      this.isLoggedIn = true;
      return true;
    }

    // Credenciales inválidas, establece el estado de inicio de sesión como falso
    this.isLoggedIn = false;
    return false;
  }

  logout(): void {
    // Cierra la sesión del usuario estableciendo el estado de inicio de sesión como falso
    this.isLoggedIn = false;
  }

  get loggedIn(): boolean {
    // Devuelve el estado de inicio de sesión actual
    return this.isLoggedIn;
  }
}
