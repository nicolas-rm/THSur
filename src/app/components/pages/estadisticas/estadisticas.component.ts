import { Component, OnInit } from '@angular/core';


import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { EstadisticasService } from '../../../services/estadisticas.service';
import { Router } from '@angular/router';

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
      backgroundColor: ['rgb(32, 106, 93)', 'rgb(129, 178, 20)', 'rgb(255, 204, 41)', 'rgb(245, 134, 52)'],
    },
  ];
  graficas = {
    grafica1: {
      Labels: ['Tornilleria', 'Servicios', 'Refacciones', 'Ferreteria'],
      Data: this.dailyReport,
      Type: this.pieChartType,
      Legend: 'Reporte Diario',
      colors: this.pieChartColors,
      active: ''
    },
    grafica3: {
      Labels: ['Tornilleria', 'Servicios', 'Refacciones', 'Ferreteria'],
      Data: this.monthlyReport,
      Type: this.pieChartType,
      Legend: 'Reporte Mensual',
      colors: this.pieChartColors,
      active: ''

    },
    grafica4: {
      Labels: ['Tornilleria', 'Servicios', 'Refacciones', 'Ferreteria'],
      Data: this.generalReport,
      Type: this.pieChartType,
      Legend: 'Reporte Total',
      colors: this.pieChartColors,
      active: ''
    }
  }



  constructor(private estadisticas: EstadisticasService, private router: Router) {

    this.detec();
  }

  ngOnInit(): void {
    this.detec();

  }

  detec() {
    this.restablecer();
    this.estadisticas.dailyReport('THSureste-Abonos').subscribe((resp) => {
      // console.log(resp);
    });
    this.estadisticas.dailyReport('THSureste-Contado').subscribe((resp) => {
      // console.log(resp);
      this.dailyReport[0] = resp[0];
      this.dailyReport[1] = resp[1];
      this.dailyReport[2] = resp[2];
      this.dailyReport[3] = resp[3];
      // this.estadisticas.exist = true;
    });
    this.estadisticas.weeklyReport('THSureste-Abonos').subscribe((resp) => {
      // console.log(resp);
    });
    this.estadisticas.weeklyReport('THSureste-Contado').subscribe((resp) => {
      // console.log(resp);
      this.weeklyReport[0] = resp[0];
      this.weeklyReport[1] = resp[1];
      this.weeklyReport[2] = resp[2];
      this.weeklyReport[3] = resp[3];
      // this.estadisticas.exist = true;
    });
    this.estadisticas.monthlyReport('THSureste-Abonos').subscribe((resp) => {
      // console.log(resp);
    });
    this.estadisticas.monthlyReport('THSureste-Contado').subscribe((resp) => {
      // console.log(resp);
      this.monthlyReport[0] = resp[0];
      this.monthlyReport[1] = resp[1];
      this.monthlyReport[2] = resp[2];
      this.monthlyReport[3] = resp[3];
      // this.estadisticas.exist = true;
    });
    this.estadisticas.generalReport('THSureste-Abonos').subscribe((resp) => {
      // console.log(resp);
    });
    this.estadisticas.generalReport('THSureste-Contado').subscribe((resp) => {
      // console.log(resp);
      this.generalReport[0] = resp[0];
      this.generalReport[1] = resp[1];
      this.generalReport[2] = resp[2];
      this.generalReport[3] = resp[3];
      this.estadisticas.exist = true;
    });
  }

  restablecer() {
    this.estadisticas.dailyReportDatos = [];
    this.estadisticas.weeklyReportDatos = [];
    this.estadisticas.monthlyReportDatos = [];
    this.estadisticas.generalReportDatos = [];
    this.estadisticas.exist = false;

  }
}
