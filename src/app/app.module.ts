import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './login/landing-page.component';
import { HomeComponent } from './home/home.component';
import { ActualizarCuentaComponent } from './actualizar-cuenta/actualizar-cuenta.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { AuthGuardService } from './auth-guard-service.service';
import { CuentasClienteComponent } from './cuentas-cliente/cuentas-cliente.component';




library.add(faBars);

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomeComponent,
    ActualizarCuentaComponent,
    CrearCuentaComponent,
    ClientesComponent,
    NavbarComponent,
    CuentasClienteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    WebcamModule,

  ],
  exports: [],
  providers: [
    AuthGuardService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
