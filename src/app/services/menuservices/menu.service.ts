import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menu: any = [
    {
      titulo: 'Inicio',
      icono: 'fas fa-home',
      url: '/principal'
    },
    {
      titulo: 'Tickets',
      icono: 'fas fa-tags',
      url: '/tickets'
    },
    {
      titulo: 'Estadisticas',
      icono: 'fas fa-chart-pie',
      url: '/estadisticas'
    },
  ];

  importe: number = 0;
  constructor() { }
}
