import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuentas-cliente',
  templateUrl: './cuentas-cliente.component.html',
  styleUrls: ['./cuentas-cliente.component.css']
})
export class CuentasClienteComponent  implements OnInit {
    clienteId!: number;
    nombre! :string;
    cuentas: any[] = [];
  
    constructor(private route: ActivatedRoute,private router: Router) { }
  
    ngOnInit() {
      const clienteIdParam = this.route.snapshot.paramMap.get('clienteId');
      this.clienteId = clienteIdParam ? parseInt(clienteIdParam, 10) : 0;

      const nombreClienteParam = this.route.snapshot.paramMap.get('nombreCliente');
     this.nombre = nombreClienteParam?nombreClienteParam:'';

      // Realizar la petición Axios para obtener las cuentas del cliente
      axios.get(`http://localhost:3001/clientes/${this.clienteId}`)
        .then(response => {
          this.cuentas = response.data;
        })
        .catch(error => {
          console.error('Error al obtener las cuentas:', error);
        });
    }

    obtenerCuentas() {
      axios
        .get(`http://localhost:3001/clientes/${this.clienteId}`)
        .then((response) => {
          this.cuentas = response.data;
        })
        .catch((error) => {
          console.error('Error al obtener las cuentas:', error);
        });
    }

    borrarCuenta(id: number) {
      axios.patch(`http://localhost:3001/cuentadelete/${id}`, { activo: false })
        .then(response => {
          console.log('Cuenta desactivada correctamente');
        this.obtenerCuentas();
          // Actualizar la lista de cuentas después de desactivar
        })
        .catch(error => {
          console.error('Error al desactivar la cuenta:', error);
        });
    }

    actualizarCuenta(id: number) {
      // Aquí puedes realizar la lógica para redirigir a una página de edición de la cuenta pasando el ID como parámetro de ruta
      // this.router.navigate(['/editar-cuenta', id]);
      this.router.navigate(['/actualizar', id]);
      // Puedes ajustar esta función según tus necesidades de actualización de cuentas
      // const cuentaActualizada = {
      //   // Aquí incluye las propiedades actualizadas de la cuenta
      //   // Por ejemplo:
      //   montoDeuda: 100,
      //   descripcion: 'Nueva descripción'
      // };
  
      // axios.patch(`http://localhost:3001/cuentas/${id}`, cuentaActualizada)
      //   .then(response => {
      //     console.log('Cuenta actualizada correctamente');
      //     this.obtenerCuentas(); // Actualizar la lista de cuentas después de actualizar
      //   })
      //   .catch(error => {
      //     console.error('Error al actualizar la cuenta:', error);
      //   });
    }
  
  
}
