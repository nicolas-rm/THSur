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
  monthlyReport: Array<number> = [];
  weeklyReport: Array<number> = [];
  dailyReport: Array<number> = [];

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
