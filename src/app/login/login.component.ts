import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Registro } from '../components/interface/registro';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import Swal from 'sweetalert2';

// 3200 16
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  exist: boolean = false;
  Formulario: FormGroup;
  importe: number = 0;
  constructor(private _FireStore: FirebaseService, private _router: Router, private _localstorage: LocalStorageService) {

    if (localStorage.getItem('uid') && localStorage.getItem('email') && localStorage.getItem('date') && localStorage.getItem('import') && localStorage.getItem('name')) {
      this._router.navigate(['/principal']);
    } else {
      this._localstorage.logOut();
    }
    this.Formulario = new FormGroup({
      usuario: new FormControl(null, Validators.required),
      contrasena: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {

  }

  notSpace(id: string) {
    var input: any = document.getElementById(id);
    input.value = input.value.trim();
  }
  iniciarSesion(event: any) {
    this.notSpace('exampleFormControlInput1');
    if (this.Formulario.invalid) {
      return;
    }
    let usuario: Registro = {
      nombre: '',
      apellidos: '',
      correo: this.Formulario.value.usuario,
      contrasena: this.Formulario.value.contrasena,
      estatus: true,
      fecha: '',
      especial: false
    }

    this._FireStore.readUser(usuario.correo).subscribe((resp) => {
      this.exist = false;
      // console.log(resp);
      if (resp.length > 0) {
        this.exist = false;
        if (this._FireStore.decrypt(usuario, resp[0]) && resp[0].estatus === true) {
          // ACTUALIZO EL USUARIO CON EL TOKEN
          usuario = this._localstorage.login(resp[0]);
          usuario.fecha = String(new Date());
          this._FireStore.updateUser(usuario);
          this.exist = true;

          // redirecciona
          this._router.navigate(['/principal']).then(()=>{

          });

          return;
        }
      }

      if (resp.length == 0 && !this.exist) {
        this.exist = true;
        // console.log('USUARIO NO EXISTE.!');
        return;
      }
      if (!this._FireStore.decrypt(usuario, resp[0]) && !this.exist) {
        this.exist = true;
        // SWAL_ERROR('Usuario o Contraseña Incorrecta', 2500);
        return;
      }
    });
  }

  inicio() {

  }

}
export const SWAL_ERROR = (leyenda: string, time: number) => {
  const Toast = Swal.mixin({
    toast: true,
    // width: 250,
    position: 'top-end',
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: 'error',
    title: leyenda
  });
};
