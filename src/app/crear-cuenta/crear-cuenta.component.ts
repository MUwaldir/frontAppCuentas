import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {
  cuentaForm: FormGroup;
  imagenCapturada: File | null = null; // Variable para almacenar la imagen seleccionada como archivo
  imagenCapturadaURL: any; // Variable para almacenar la URL de la imagen seleccionada
  loading: boolean = false; // Variable para indicar si se está cargando la imagen

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.cuentaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      monto: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      descripcion: ['', Validators.required],
      imagen: [null]
    });
  }

  ngOnInit(): void {
    // Lógica de inicialización (opcional)
  }

  async onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imagenCapturada = event.target.files[0];

      try {
        this.loading = true;
        const imageUrl = await this.subirImagenACloudinary();
        this.imagenCapturadaURL = imageUrl;
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      } finally {
        this.loading = false;
      }
    }
  }

  async subirImagenACloudinary(): Promise<string> {
    const formData = new FormData();
    formData.append('file', this.imagenCapturada as Blob);
    formData.append('upload_preset', 'cuentas'); // Reemplazar con el nombre del preset de carga
    formData.append('api_key', '943388582275922'); // Reemplazar con tu clave de API de Cloudinary
    formData.append('cloud_name', 'dyh51ysjo'); // Reemplazar con el nombre de tu cuenta de Cloudinary

    const response = await axios.post('https://api.cloudinary.com/v1_1/dyh51ysjo/image/upload', formData);

    return response.data.secure_url;
  }


  previewImage() {
    if (this.imagenCapturada) {
      const reader = new FileReader();
      reader.readAsDataURL(this.imagenCapturada);
      reader.onload = (_event) => {
        this.imagenCapturadaURL = reader.result;
      };
    } else {
      this.imagenCapturadaURL = null; // Reset the image URL when no image is selected
    }
  }

  crearCuenta() {
    if (this.cuentaForm.invalid) {
      this.marcarCamposComoTocados();
      return;
    }

    // Obtener solo el nombre de la imagen, sin enviar el archivo completo al backend
    const nombreImagen = this.imagenCapturada ? this.imagenCapturada.name : null;

    // Construir el objeto de datos que se enviará al backend
    const datosCuenta = {
      nombre: this.cuentaForm.get('nombre')?.value,
      monto: this.cuentaForm.get('monto')?.value,
      descripcion: this.cuentaForm.get('descripcion')?.value,
      imagen: nombreImagen
    };

    // Iniciar la carga de la imagen a Cloudinary
    this.loading = true;
    this.subirImagenACloudinary().then((url) => {
      datosCuenta.imagen = url; // Reemplazar con la URL de la imagen en Cloudinary

      // Realizar la solicitud al backend (ajusta la URL del endpoint según tu configuración)
      axios.post('http://localhost:3001/cuentas', datosCuenta)
        .then(response => {
          console.log('Cuenta creada:', response.data);
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error('Error al crear la cuenta:', error);
        })
        .finally(() => {
          this.loading = false; // Restablecer el estado del botón "Crear Cuenta" después de enviar la solicitud
        });
    });
  }



  get nombre() {
    return this.cuentaForm.get('nombre');
  }

  get monto() {
    return this.cuentaForm.get('monto');
  }

  get descripcion() {
    return this.cuentaForm.get('descripcion');
  }

  marcarCamposComoTocados() {
    Object.keys(this.cuentaForm.controls).forEach(campo => {
      const control = this.cuentaForm.get(campo);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}
