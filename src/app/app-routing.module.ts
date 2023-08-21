import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './login/landing-page.component';
import { HomeComponent } from './home/home.component';
import { ActualizarCuentaComponent } from './actualizar-cuenta/actualizar-cuenta.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { AuthGuardService } from './auth-guard-service.service';
import { CuentasClienteComponent } from './cuentas-cliente/cuentas-cliente.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuardService]},
  { path: 'actualizar/:id', component: ActualizarCuentaComponent ,canActivate: [AuthGuardService] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuardService] },
  { path: 'crear', component: CrearCuentaComponent, canActivate: [AuthGuardService] },
  { path: 'cuentas/:clienteId/:nombreCliente', component: CuentasClienteComponent, canActivate: [AuthGuardService]}, // Ruta para mostrar las cuentas del cliente
  { path: '**', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
