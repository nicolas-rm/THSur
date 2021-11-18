import { Injectable } from '@angular/core';
import { Registro } from '../components/interface/registro';
import { compareSync, hashSync } from 'bcryptjs';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private _login: LoginService, private router: Router) {

  }

  login(document: Registro) {
    this.logOut();

    // this._login.usuario = document;
    this._login.fecha = new Date();

    document.uid = hashSync(document.nombre + document.apellidos + document.contrasena + new Date());
    document.fecha = String(new Date());
    localStorage.setItem('name', String(`${document.nombre} ${document.apellidos}`));
    localStorage.setItem('date', String(this._login.fecha));
    localStorage.setItem('email', String(document.correo));
    localStorage.setItem('uid', String(document.uid));

    return document;
  }

  logOut() {
    localStorage.removeItem('uid');
    localStorage.removeItem('email');
    localStorage.removeItem('date');
    localStorage.removeItem('import');
    localStorage.removeItem('name');
    localStorage.removeItem('return');
    this.router.navigate(['/inicio']);
  }

  loadStorage() {
    if(localStorage.getItem('uid') && localStorage.getItem('email') && localStorage.getItem('date') && localStorage.getItem('import') && localStorage.getItem('name')){

    }
  }
  verify(uid: string) {
    let exist = false;
    if (uid && localStorage.getItem('uid')) {
      if (compareSync((uid), String(localStorage.getItem('uid')))) {
        exist = false;
      } else {
        exist = true;
      }
    }
    return exist;
  }
}
