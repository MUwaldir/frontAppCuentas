import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  nombreClienteBusqueda: string = '';
  

  ngOnInit() {
    this.obtenerClientes();
  }

  obtenerClientes() {
    axios
      .get('http://localhost:3001/clientes')
      .then(response => {
        this.clientes = response.data;
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los clientes:', error);
      });
  }

  obtenerSumaMontos(cuentas: any[]): number {
    return cuentas.reduce((total, cuenta) => total + cuenta.monto, 0);
  }

  borrarCliente(id: number) {
    // axios
    //   .delete(`http://localhost:3001/clientes/${id}`)
    //   .then(response => {
    //     console.log('Cliente eliminado correctamente');
    //     this.obtenerClientes(); // Actualizar la lista de clientes después de eliminar
    //   })
    //   .catch(error => {
    //     console.error('Error al eliminar el cliente:', error);
    //   });
  }

  getCuentas(id: number) {
    // Lógica para redirigir a la página de actualización de cliente
  }

 
  filtrarClientesPorNombre() {
    const nombreCliente = this.nombreClienteBusqueda.toLowerCase();
    if (nombreCliente.trim() === '') {
      this.obtenerClientes(); // Volver a obtener todas las cuentas si el input de búsqueda está vacío
    } else {
      this.clientes = this.clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(nombreCliente)
      );
    }
  }



  mostrarTodosLosClientes() {
    this.obtenerClientes() ;
  }
}
