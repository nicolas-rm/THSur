import { Injectable } from '@angular/core';
import { Registro } from '../../components/interface/registro';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario: Registro = {
    uid: '',
    nombre: '',
    estatus: false,
    correo: '',
    apellidos: '',
    contrasena: ''
  };
  importe = 0;
  fecha!: Date;
  constructor() { }
}
