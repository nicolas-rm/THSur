import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Registro } from '../components/interface/registro';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginService } from '../services/login/login.service';
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
      contrasena: new FormControl(null, Validators.required),
      recordar: new FormControl()
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
      //// //  // // console.log(resp);
      if (resp.length > 0) {
        if (this._FireStore.decrypt(usuario, resp[0]) && resp[0].estatus === true) {
          // ACTUALIZO EL USUARIO CON EL TOKEN
          usuario = this._localstorage.login(resp[0]);
          usuario.fecha = String(new Date());
          this._FireStore.updateUser(usuario);
          this.exist = true;

          // redirecciona
          this._router.navigate(['/principal']);
        }

        if (resp && !this.exist) {
          // //  // // console.log('USUARIO O CONTRASEÑA INCORRECTA.!');
        }
      }
    });
  }

  inicio() {

  }

}
