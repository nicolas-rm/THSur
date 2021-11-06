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
  generalReport: Array<number> = [];
  monthlyReport: Array<number> = [];
  weeklyReport: Array<number> = [];
  dailyReport: Array<number> = [];
  exist: boolean = false;
  public pieChartType: ChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,0,0,255.3)'],
    },
  ];
  graficas = {
    grafica1: {
      Labels: ['Servicios', 'Ferreteria', 'Tornilleria General', 'Refacciones'],
      Data: this.dailyReport,
      Type: this.pieChartType,
      Legend: 'Reporte Diario',
      colors: this.pieChartColors,
      active: 'active'
    },
    grafica2: {
      Labels: ['Servicios', 'Ferreteria', 'Tornilleria General', 'Refacciones'],
      Data: this.weeklyReport,
      Type: this.pieChartType,
      Legend: 'Reporte Semanal',
      colors: this.pieChartColors,
      active: ''
    },
    grafica3: {
      Labels: ['Servicios', 'Ferreteria', 'Tornilleria General', 'Refacciones'],
      Data: this.monthlyReport,
      Type: this.pieChartType,
      Legend: 'Reporte Mensual',
      colors: this.pieChartColors,
      active: ''

    },
    grafica4: {
      Labels: ['Servicios', 'Ferreteria', 'Tornilleria General', 'Refacciones'],
      Data: this.generalReport,
      Type: this.pieChartType,
      Legend: 'Reporte Total',
      colors: this.pieChartColors,
      active: ''
    }
  }



  constructor(private estadisticas: EstadisticasService) {
    this.estadisticas.generalReport('THSureste-Abonos').subscribe((resp) => {
      this.generalReport[0] = resp.totalservicios;
      this.generalReport[1] = resp.totalferreteria;
      this.generalReport[2] = resp.totaltornilleria;
      this.generalReport[3] = resp.totalrefacciones;
      console.log('SALIENDO DE ABONOS');
      console.log(this.generalReport);
    });
    this.estadisticas.generalReport('THSureste-Contado').subscribe((resp) => {
      this.generalReport[0] = resp.totalservicios;
      this.generalReport[1] = resp.totalferreteria;
      this.generalReport[2] = resp.totaltornilleria;
      this.generalReport[3] = resp.totalrefacciones;
      console.log('SALIENDO DE CONTADO');
      console.log(this.generalReport);
    });
    this.estadisticas.monthlyReport('THSureste-Abonos').subscribe((resp) => {
      this.monthlyReport[0] = resp.totalservicios;
      this.monthlyReport[1] = resp.totalferreteria;
      this.monthlyReport[2] = resp.totaltornilleria;
      this.monthlyReport[3] = resp.totalrefacciones;
      console.log('SALIENDO DE ABONOS');
      console.log(this.generalReport);
    });
    this.estadisticas.monthlyReport('THSureste-Contado').subscribe((resp) => {
      this.monthlyReport[0] = resp.totalservicios;
      this.monthlyReport[1] = resp.totalferreteria;
      this.monthlyReport[2] = resp.totaltornilleria;
      this.monthlyReport[3] = resp.totalrefacciones;
      console.log('SALIENDO DE CONTADO');
      console.log(this.monthlyReport);
    });
  }

  ngOnInit(): void {

  }

  detec(event: any) {
    ////  console.log(event);
  }
}
