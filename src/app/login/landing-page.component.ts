import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import axios from 'axios'; 
import { environment } from 'src/enviroments/enviroments';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
    username = '';
    password = '';
    showError: boolean = false;
    showPassword: boolean = false;
    apiUrl :string = environment.apiUrl

  constructor(private router: Router,private authService: AuthService) {
  
  }
  async onSubmit() {
    try {
      // Llama a la función login utilizando await para esperar a que se resuelva la promesa
      const loggedIn = await this.authService.login(this.username, this.password);
  
      // Verifica si el inicio de sesión fue exitoso antes de redirigir
      if (loggedIn) {
        this.router.navigate(['/home']);
      } else {
        // Mostrar un mensaje de error si el inicio de sesión falla
        console.error('Nombre de usuario o contraseña incorrectos');
        // alert('Nombre de usuario o contraseña incorrectos')
        this.showError = true
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  // Agrega este método para verificar el token cuando el componente se inicializa
  async ngOnInit() {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        // Verificar el token en el backend utilizando axios
        const response = await axios.post(`${this.apiUrl}/validar-token`, { token });

        // Si el token es válido, redirigir al usuario a la página de inicio
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
    }
  }

  cerrarError() {
    this.showError = false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
