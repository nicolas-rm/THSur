import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Registro } from '../components/interface/registro';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  exist: boolean = false;
  Formulario: FormGroup;
  constructor(private _FireStore: FirebaseService, private _router: Router) {
    this.Formulario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, Validators.required),
      contrasena2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false, Validators.required)
    }, { validators: this.checkPasswords });
    this.Formulario.setValue({
      nombre: 'Nicolas ',
      apellidos: 'Rincon Mujica',
      correo: '',
      contrasena: '123456',
      contrasena2: '123456',
      condiciones: true
    });
  }

  ngOnInit(): void {
  }

  registrarUsuario(event: any) {
    // console.log(event);
    if (this.Formulario.invalid) {
      return;
    }

    if (!this.Formulario.value.condiciones) {
      return;
    }

    let usuario: Registro = {
      nombre: this.Formulario.value.nombre,
      apellidos: this.Formulario.value.apellidos,
      correo: this.Formulario.value.correo,
      contrasena: this.Formulario.value.contrasena,
      estatus: false
    }
    this._FireStore.search('THSureste-usuarios', usuario.correo).subscribe((resp) => {
      if (!resp) {
        this._FireStore.createUser(this._FireStore.encrypt(usuario));
        this.exist = true;
        this.Formulario.setValue({
          nombre: ' ',
          apellidos: '',
          correo: '',
          contrasena: '',
          contrasena2: '',
          condiciones: true
        });
        this._router.navigate(['/inicio']);
      }
      if (resp && !this.exist) {
        // console.log('USUARIO YA SE ENCUENTRA REGISTRADO');
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

