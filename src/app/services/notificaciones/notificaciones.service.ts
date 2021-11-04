import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  ngClass = '';
  accion: boolean = true;
  text: string = ''
  constructor() { }
}
