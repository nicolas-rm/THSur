import { Component, OnInit } from '@angular/core';


import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { EstadisticasService } from '../../../services/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  generalReport = [
    { tornilleria: false, departamento: 'tornilleria', totaltornilleria: 0 },
    { servicios: false, departamento: 'servicios', totalservicios: 0 },
    { refacciones: false, departamento: 'refacciones', totalrefacciones: 0 },
    { ferreteria: false, departamento: 'ferreteria', totalferreteria: 0 }
  ];
  monthlyReport = [
    { tornilleria: false, departamento: 'tornilleria', totaltornilleria: 0 },
    { servicios: false, departamento: 'servicios', totalservicios: 0 },
    { refacciones: false, departamento: 'refacciones', totalrefacciones: 0 },
    { ferreteria: false, departamento: 'ferreteria', totalferreteria: 0 }
  ];
  weeklyReport = [
    { tornilleria: false, departamento: 'tornilleria', totaltornilleria: 0 },
    { servicios: false, departamento: 'servicios', totalservicios: 0 },
    { refacciones: false, departamento: 'refacciones', totalrefacciones: 0 },
    { ferreteria: false, departamento: 'ferreteria', totalferreteria: 0 }
  ];
  dailyReport = [
    { tornilleria: false, departamento: 'tornilleria', totaltornilleria: 0 },
    { servicios: false, departamento: 'servicios', totalservicios: 0 },
    { refacciones: false, departamento: 'refacciones', totalrefacciones: 0 },
    { ferreteria: false, departamento: 'ferreteria', totalferreteria: 0 }
  ];
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
      Labels: ['Servicios', 'Ferreteria', 'Tornilleria General', 'Refacciones'],
      Data: [300, 500, 100, 100],
      Type: this.pieChartType,
      Legend: 'Reporte Diario',
      active: 'active'
    },
    grafica2: {
      Labels: ['Servicios', 'Ferreteria', 'Tornilleria General', 'Refacciones'],
      Data: [300, 500, 100, 100],
      Type: this.pieChartType,
      Legend: 'Reporte Semanal',
      active: ''
    },
    grafica3: {
      Labels: ['Servicios', 'Ferreteria', 'Tornilleria General', 'Refacciones'],
      Data: [300, 500, 100, 100],
      Type: this.pieChartType,
      Legend: 'Reporte Mensual',
      active: ''

    },
    grafica4: {
      Labels: ['Servicios', 'Ferreteria', 'Tornilleria General', 'Refacciones'],
      Data: [Number(this.generalReport[0].totalservicios), Number(this.generalReport[0].totalferreteria), Number(this.generalReport[0].totaltornilleria), Number(this.generalReport[0].totalrefacciones)],
      Type: this.pieChartType,
      Legend: 'Reporte Total',
      active: ''
    }
  }

  constructor(private estadisticas: EstadisticasService) {
    this.estadisticas.generalReport('THSureste-Abonos').subscribe((resp) => {
      console.log(resp);
      this.generalReport[0].totalferreteria = resp[0].totalferreteria;
      this.generalReport[0].totalrefacciones = resp[0].totalrefacciones;
      this.generalReport[0].totalservicios = resp[0].totalservicios;
      this.generalReport[0].totaltornilleria = resp[0].totaltornilleria;
    });
  }

  ngOnInit(): void {

  }

  detec(event: any) {
    console.log(event);
  }
}
