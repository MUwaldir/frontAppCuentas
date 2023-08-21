import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { environment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
apiUrl: string = environment.apiUrl
  constructor() { }

  async login(username: string, password: string): Promise<boolean> {
    
    try {
      // Hacer la solicitud de inicio de sesión utilizando Axios
      const response = await axios.post<any>(`${this.apiUrl}/login`, {
        nombre: username,
        contrasena: password
      });
    console.log(response.data.token)
      // Almacenar el token en el Local Storage
      const token = response.data.token;
      localStorage.setItem('token', token);
  
      // Establecer el estado de inicio de sesión como verdadero
    
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Establecer el estado de inicio de sesión como falso en caso de error
    
      return false;
    }
  }

  logout(): void {
    // Eliminar el token del Local Storage al cerrar sesión
    localStorage.removeItem('token');
    // Establecer el estado de inicio de sesión como falso
 
  }

  get loggedIn(): boolean {
    // Verificar si el token está presente en el Local Storage
    const token = localStorage.getItem('token');
    // Devuelve el estado de inicio de sesión actual
    return  token !== null;
  }



}
