import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Registro } from '../components/interface/registro';
import { FirebaseService } from '../services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  exist: boolean = false;
  Formulario: FormGroup;
  type = 'Password';
  constructor(private _FireStore: FirebaseService, private _router: Router) {
    // location.reload;
    this.Formulario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, Validators.required),
      contrasena2: new FormControl(null, Validators.required),
      // condiciones: new FormControl(false, Validators.required)
    }, { validators: this.checkPasswords });
    this.exist = false;
  }

  ngOnInit(): void {

  }

  notSpace(id: string) {
    var input: any = document.getElementById(id);
    input.value = input.value.trim();
  }

  showpass() {
    var tipo1: any = document.getElementById("contrasena");
    var tipo2: any = document.getElementById("contrasena2");
    if (tipo1.type == "password" || tipo2.type == "password") {
      tipo1.type = "text";
      tipo2.type = "text";
    } else {
      tipo1.type = "password";
      tipo2.type = "password";
    }
  }

  registrarUsuario(event: any) {
    this.notSpace('nombre');
    this.notSpace('apellidos');
    if (this.Formulario.invalid) {
      alert('ALGO SALIO MAL: DATOS INCORRECTOS');
      return;
    }

    const nombre: string = this.Formulario.value.nombre;
    const apellidos: string = this.Formulario.value.apellidos;
    const correo: string = this.Formulario.value.correo;

    let usuario: Registro = {
      nombre: nombre.toLowerCase(),
      apellidos: apellidos.toLowerCase(),
      correo: correo.toLowerCase(),
      contrasena: this.Formulario.value.contrasena,
      estatus: false
    }

    // alert('PASO LAS VALIDACIONES');
    this._FireStore.search('THSureste-usuarios', usuario.correo).subscribe((resp) => {
      if (!resp && !this.exist) {
        this._FireStore.createUser(this._FireStore.encrypt(usuario));
        this.exist = true;
        this.Formulario.setValue({
          nombre: ' ',
          apellidos: '',
          correo: '',
          contrasena: '',
          contrasena2: '',
          // condiciones: true
        });
        this._router.navigate(['/inicio']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario',
          text: 'Creado Correctamente.!',
          showConfirmButton: false,
          timer: 2500,
          width: 450
        })
      }
      if (resp && !this.exist) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Usuario',
          text: 'No Creado, Verifique.!',
          showConfirmButton: false,
          timer: 2500,
          width: 450
        })
        // // console.log('USUARIO YA SE ENCUENTRA REGISTRADO');
      }

    });

  }



  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('contrasena')!.value;
    let confirmPass = group.get('contrasena2')!.value;

    if (pass === confirmPass) {
      return null;
    }
    return { notSame: true };
  }
}

