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

  }

  ngOnInit(): void {
    this.estadisticas.generalReport('THSureste-Abonos').subscribe((resp) => {
      this.generalReport.push(resp.totalferreteria);
      this.generalReport.push(resp.totalrefacciones);
      this.generalReport.push(resp.totalservicios);
      this.generalReport.push(resp.totaltornilleria);
    });
    this.estadisticas.generalReport('THSureste-Contado').subscribe((resp) => {
      this.generalReport[0] = this.generalReport[0] + resp.totalferreteria;
      this.generalReport[1] = this.generalReport[1] + resp.totalrefacciones;
      this.generalReport[2] = this.generalReport[2] + resp.totalservicios;
      this.generalReport[3] = this.generalReport[3] + resp.totaltornilleria;
    });
    console.log(this.generalReport);
  }

  detec(event: any) {
    // console.log(event);
  }
}
