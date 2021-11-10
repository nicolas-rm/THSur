import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, LOCALE_ID } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { convertTimestamp } from 'convert-firebase-timestamp';
import { EstadisticasService } from '../../../services/estadisticas.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  cajero: string = '';
  date: string = '';
  @Input() bankName: string = '';
  generalReport: Array<number> = [];
  general: Array<number> = [];

  monthlyReport: Array<number> = [];
  monthly: Array<number> = [];

  weeklyReport: Array<number> = [];
  weekly: Array<number> = [];

  dailyReport: Array<number> = [];
  daily: Array<number> = [];

  constructor(public _login: LoginService, private _localstorage: LocalStorageService, private estadisticas: EstadisticasService) {
    if (localStorage.getItem('uid') && localStorage.getItem('email') && localStorage.getItem('date') && localStorage.getItem('import') && localStorage.getItem('name')) {
      this.cajero = String(localStorage.getItem('name'));
      this.date = String(localStorage.getItem('date'));
    }

    this.detec();
  }

  ngOnInit(): void {
    this.detec();
  }

  cerrar() {
    this._localstorage.logOut();
  }
  detec() {
    this.restablecer();
    this.estadisticas.dailyReport('THSureste-Abonos').subscribe((resp) => {
      // console.log(resp);
    });
    this.estadisticas.dailyReport('THSureste-Contado').subscribe((resp) => {
      // console.log(resp);
      this.dailyReport = resp;
      // this.estadisticas.exist = true;
    });
    this.estadisticas.weeklyReport('THSureste-Abonos').subscribe((resp) => {
      // console.log(resp);
    });
    this.estadisticas.weeklyReport('THSureste-Contado').subscribe((resp) => {
      // console.log(resp);
      this.weeklyReport = resp;
      // this.estadisticas.exist = true;
    });
    this.estadisticas.monthlyReport('THSureste-Abonos').subscribe((resp) => {
      // console.log(resp);
    });
    this.estadisticas.monthlyReport('THSureste-Contado').subscribe((resp) => {
      // console.log(resp);
      this.monthlyReport = resp;
      // this.estadisticas.exist = true;
    });
    this.estadisticas.generalReport('THSureste-Abonos').subscribe((resp) => {
      // console.log(resp);
    });
    this.estadisticas.generalReport('THSureste-Contado').subscribe((resp) => {
      // console.log(resp);
      this.generalReport = resp;
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
