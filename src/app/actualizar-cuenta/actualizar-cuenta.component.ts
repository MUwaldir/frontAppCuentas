import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-actualizar-cuenta',
  templateUrl: './actualizar-cuenta.component.html',
  styleUrls: ['./actualizar-cuenta.component.css']
})
export class ActualizarCuentaComponent implements OnInit {
  
  id!: string;
  cuentaForm!: FormGroup;
  nombre!: AbstractControl;
  monto!: AbstractControl;
  descripcion!: AbstractControl;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerCuenta();
  }

  crearFormulario(): void {
    this.cuentaForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required]
    });

    this.nombre = this.cuentaForm.get('nombre')!;
    this.monto = this.cuentaForm.get('monto')!;
    this.descripcion = this.cuentaForm.get('descripcion')!;
  }

  obtenerCuenta(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      axios
        .get(`http://localhost:3001/cuenta/${this.id}`)
        .then((response) => {
          this.cuentaForm.patchValue(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener la cuenta:', error);
        });
    });
  }

  actualizarCuenta(): void {
    if (this.cuentaForm.invalid) {
      this.cuentaForm.markAllAsTouched();
      return;
    }

    const idCuenta = this.cuentaForm.get('id')?.value;
    const cuerpoDatos = this.cuentaForm.value;
    console.log(cuerpoDatos);

    axios
      .patch(`http://localhost:3001/cuentas/${idCuenta}`, cuerpoDatos)
      .then((response) => {
        console.log('Cuenta actualizada:', response.data);
        this.router.navigate(['/home']);
        // Realizar acciones adicionales después de la actualización exitosa
      })
      .catch((error) => {
        console.error('Error al actualizar la cuenta:', error);
        // Realizar acciones adicionales en caso de error
      });
  }
}
