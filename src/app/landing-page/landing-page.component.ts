import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
    username = '';
    password = '';

  constructor(private router: Router,private authService: AuthService) {
  
  }

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      // Lógica para el ingreso exitoso
      console.log('Ingreso exitoso');
      localStorage.setItem('isLoggedIn', 'true');

      this.router.navigate(['/home']);
    } else {
      // Lógica para el ingreso fallido
      console.log('Usuario o contraseña incorrectos');
    }
  }
}
