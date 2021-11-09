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
      active: ''
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



  constructor(private estadisticas: EstadisticasService, private router: Router) {

    // if(localStorage.getItem('redirect')){
    //   this.router.navigate(['/tickets']);
    //   localStorage.setItem('redirect', 'true');
    // }
    // this.estadisticas.dailyReportDatos = [];
    // this.estadisticas.weeklyReportDatos = [];
    // this.estadisticas.monthlyReportDatos = [];
    // this.estadisticas.generalReportDatos = [];
    this.detec();
  }

  ngOnInit(): void {
    this.detec();

  }

  detec() {
    // this.detec()
    this.estadisticas.dailyReportDatos = [];
    this.estadisticas.weeklyReportDatos = [];
    this.estadisticas.monthlyReportDatos = [];
    this.estadisticas.generalReportDatos = [];
    this.estadisticas.dailyReport('THSureste-Abonos').subscribe((resp) => {
      this.dailyReport[0] = (resp[0] == 0 || resp[0] == null) ? 0 : resp[0];
      this.dailyReport[1] = (resp[1] == 0 || resp[1] == null) ? 0 : resp[1];
      this.dailyReport[2] = (resp[2] == 0 || resp[2] == null) ? 0 : resp[2];
      this.dailyReport[3] = (resp[3] == 0 || resp[3] == null) ? 0 : resp[3];
      console.log(resp);
    });
    this.estadisticas.dailyReport('THSureste-Contado').subscribe((resp) => {
      this.dailyReport[0] = (resp[0] == 0 || resp[0] == null) ? 0 : resp[0];
      this.dailyReport[1] = (resp[1] == 0 || resp[1] == null) ? 0 : resp[1];
      this.dailyReport[2] = (resp[2] == 0 || resp[2] == null) ? 0 : resp[2];
      this.dailyReport[3] = (resp[3] == 0 || resp[3] == null) ? 0 : resp[3];
      console.log(resp);
    });
    this.estadisticas.monthlyReport('THSureste-Abonos').subscribe((resp) => {
      this.monthlyReport[0] = (resp[0] == 0 || resp[0] == null) ? 0 : resp[0];
      this.monthlyReport[1] = (resp[1] == 0 || resp[1] == null) ? 0 : resp[1];
      this.monthlyReport[2] = (resp[2] == 0 || resp[2] == null) ? 0 : resp[2];
      this.monthlyReport[3] = (resp[3] == 0 || resp[3] == null) ? 0 : resp[3];
      // console.log(resp);
    });
    this.estadisticas.monthlyReport('THSureste-Contado').subscribe((resp) => {
      this.monthlyReport[0] = (resp[0] == 0 || resp[0] == null) ? 0 : resp[0];
      this.monthlyReport[1] = (resp[1] == 0 || resp[1] == null) ? 0 : resp[1];
      this.monthlyReport[2] = (resp[2] == 0 || resp[2] == null) ? 0 : resp[2];
      this.monthlyReport[3] = (resp[3] == 0 || resp[3] == null) ? 0 : resp[3];
      // console.log(resp);
    });

    this.estadisticas.generalReport('THSureste-Abonos').subscribe((resp) => {
      this.generalReport[0] = (resp[0] == 0 || resp[0] == null) ? 0 : resp[0];
      this.generalReport[1] = (resp[1] == 0 || resp[1] == null) ? 0 : resp[1];
      this.generalReport[2] = (resp[2] == 0 || resp[2] == null) ? 0 : resp[2];
      this.generalReport[3] = (resp[3] == 0 || resp[3] == null) ? 0 : resp[3];
      // console.log(resp);
    });
    this.estadisticas.generalReport('THSureste-Contado').subscribe((resp) => {
      this.generalReport[0] = (resp[0] == 0 || resp[0] == null) ? 0 : resp[0];
      this.generalReport[1] = (resp[1] == 0 || resp[1] == null) ? 0 : resp[1];
      this.generalReport[2] = (resp[2] == 0 || resp[2] == null) ? 0 : resp[2];
      this.generalReport[3] = (resp[3] == 0 || resp[3] == null) ? 0 : resp[3];
      // console.log(resp);
    });

  }
}
