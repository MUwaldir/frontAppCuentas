
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/enviroments';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cuentas: any[] = [];
  detalleCuenta: any | null = null; // Variable para almacenar los detalles de una cuenta
  nombreClienteBusqueda: string = '';
  mostrarModal = false; // Variable para controlar la visualización del modal
  apiUrl:string = environment.apiUrl;
 
  constructor(private router: Router) {}

  ngOnInit() {
    this.obtenerCuentas();
  }

  obtenerCuentas() {
    axios.get(`${this.apiUrl}/cuentas`)
      .then(response => {
        this.cuentas = response.data;
      
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las cuentas:', error);
      });
  }

  borrarCuenta(id: number) {
    axios.patch(`${this.apiUrl}/cuentadelete/${id}`, { activo: false })
      .then(response => {
        console.log('Cuenta desactivada correctamente');
        this.obtenerCuentas(); // Actualizar la lista de cuentas después de desactivar
      })
      .catch(error => {
        console.error('Error al desactivar la cuenta:', error);
      });
  }

  // Método para abrir el modal con los detalles de la cuenta
  verDetallesCuenta(idCuenta: any) {
    console.log(idCuenta)
  //  this.mostrarModal = true; // Mostrar el modal
    // Realizar una solicitud a la API para obtener los detalles de la cuenta
    axios.get(`${this.apiUrl}/cuenta/${idCuenta}`)
      .then(response => {
        this.detalleCuenta = response.data;
        this.mostrarModal = true;
        console.log(response.data)
        
      })
      .catch(error => {
        console.error('Error al obtener los detalles de la cuenta:', error);
      });

   
  }

  // Método para cerrar el modal
  cerrarDetallesCuenta() {
    // Ocultar el modal
    this.mostrarModal = false;
    this.detalleCuenta = null;
    
  }


  actualizarCuenta(id: number) {
    // Lógica para redirigir a una página de edición de la cuenta pasando el ID como parámetro de ruta
    this.router.navigate(['/actualizar', id]);
  }

  filtrarCuentasPorNombre() {
    const nombreCliente = this.nombreClienteBusqueda.toLowerCase();
    if (nombreCliente.trim() === '') {
      this.obtenerCuentas(); // Volver a obtener todas las cuentas si el input de búsqueda está vacío
    } else {
      this.cuentas = this.cuentas.filter(cuenta =>
        cuenta.nombre.toLowerCase().includes(nombreCliente)
      );
    }
  }

  mostrarTodasLasCuentas() {
    this.obtenerCuentas();
  }
}
