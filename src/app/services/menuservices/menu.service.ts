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
      titulo: 'Graficas',
      icono: 'fas fa-chart-pie',
      url: '/estadisticas'
    },
    {
      titulo: 'Usuarios',
      icono: 'fas fa-user-alt',
      url: '/usuarios'
    },
  ];

  importe: number = 0;
  constructor() { }
}
