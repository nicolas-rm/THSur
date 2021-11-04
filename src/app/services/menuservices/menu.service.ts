import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menu: any = [
    {
      titulo: 'Inicio',
      icono: 'fas fa-tools',
      url: '/principal'
    },
    {
      titulo: 'Tickets',
      icono: 'fas fa-tools',
      url: '/tickets'
    },
    {
      titulo: 'Estadisticas',
      icono: 'fas fa-tools',
      url: '/estadisticas'
    },
    {
      titulo: 'Ventas',
      icono: 'fas fa-tools',
      url: '/ventas'
    }
  ];

  importe: number = 0;
  constructor() { }
}
