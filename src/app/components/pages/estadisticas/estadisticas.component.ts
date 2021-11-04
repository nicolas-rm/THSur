import { Component, OnInit } from '@angular/core';


import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  // Pie
  // public pieChartLabels: Label[] = ['Servicios: ' + '300', 'Ferreteria', 'Tornilleria General', 'Refacciones'];
  // public pieChartData: number[] = [300, 500, 100, 100];
  public pieChartType: ChartType = 'pie';
  // public pieChartLegend = true;

  // public pieChartColors = [
  //   {
  //     backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  //   },
  // ];

  graficas = {
    grafica1: {
      Labels: ['Servicios: ' + '300', 'Ferreteria', 'Tornilleria General', 'Refacciones'],
      Data: [300, 500, 100, 100],
      Type: this.pieChartType,
      Legend: 'Reporte Diario',
      active: 'active'
    },
    grafica2: {
      Labels: ['Servicios: ' + '300', 'Ferreteria', 'Tornilleria General', 'Refacciones'],
      Data: [300, 500, 100, 100],
      Type: this.pieChartType,
      Legend: 'Reporte Semanal',
      active: ''
    },
    grafica3: {
      Labels: ['Servicios: ' + '300', 'Ferreteria', 'Tornilleria General', 'Refacciones'],
      Data: [300, 500, 100, 100],
      Type: this.pieChartType,
      Legend: 'Reporte Mensual',
      active: ''

    },
    grafica4: {
      Labels: ['Servicios: ' + '300', 'Ferreteria', 'Tornilleria General', 'Refacciones'],
      Data: [300, 500, 100, 100],
      Type: this.pieChartType,
      Legend: 'Reporte Total',
      active: ''
    }
  }
  constructor() {
  }

  ngOnInit(): void {

  }
}
