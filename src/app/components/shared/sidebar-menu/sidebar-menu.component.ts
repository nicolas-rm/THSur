import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, LOCALE_ID } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { convertTimestamp } from 'convert-firebase-timestamp';
import { EstadisticasService } from '../../../services/estadisticas.service';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  cajero: string = '';
  date: string = '';
  import: number = 0;

  entrada: number = 0;
  salida: number = 0;

  @Input() bankName: string = '';
  generalReport: Array<number> = [];
  general: Array<number> = [];

  monthlyReport: Array<number> = [];
  monthly: Array<number> = [];

  weeklyReport: Array<number> = [];
  weekly: Array<number> = [];

  dailyReport: Array<number> = [];
  daily: Array<number> = [];

  constructor(public _login: LoginService, private _localstorage: LocalStorageService, private estadisticas: EstadisticasService, private FireStore: FirebaseService) {
    if (localStorage.getItem('uid') && localStorage.getItem('email') && localStorage.getItem('date') && localStorage.getItem('import') && localStorage.getItem('name')) {
      this.cajero = String(localStorage.getItem('name'));
      this.date = String(localStorage.getItem('date'));
      this.import = Number(localStorage.getItem('import'));
      const email = String(localStorage.getItem('email'));
      this.FireStore.readUser(email).subscribe((u) => {
        if (u) {
          if (!u[0].estatus) {
            this._localstorage.logOut();
          }
        }
      });
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
      //(resp);
    });
    this.estadisticas.dailyReport('THSureste-Contado').subscribe((resp) => {
      //(resp);
      this.dailyReport = resp;
      // this.estadisticas.exist = true;
    });
    this.estadisticas.weeklyReport('THSureste-Abonos').subscribe((resp) => {
      //(resp);
    });
    this.estadisticas.weeklyReport('THSureste-Contado').subscribe((resp) => {
      //(resp);
      this.weeklyReport = resp;
      // this.estadisticas.exist = true;
    });
    this.estadisticas.monthlyReport('THSureste-Abonos').subscribe((resp) => {
      //(resp);
    });
    this.estadisticas.monthlyReport('THSureste-Contado').subscribe((resp) => {
      //(resp);
      this.monthlyReport = resp;
      // this.estadisticas.exist = true;
    });
    this.estadisticas.generalReport('THSureste-Abonos').subscribe((resp) => {
      //(resp);
    });
    this.estadisticas.generalReport('THSureste-Contado').subscribe((resp) => {
      //(resp);
      this.generalReport = resp;
      // this.estadisticas.exist = true;
    });
    this.estadisticas.entrys('THSureste-Abonos').subscribe((resp) => {

    });
    this.estadisticas.entrys('THSureste-Contado').subscribe((resp) => {
      //(resp);
      this.entrada = resp;
      this.estadisticas.exist = true;
    });

    if (localStorage.getItem('return')) {
      const resta = Number(localStorage.getItem('return'));
      this.salida = resta;
      this.entrada = this.entrada - this.salida;
    }

  }

  restablecer() {
    this.estadisticas.dailyReportDatos = [];
    this.estadisticas.weeklyReportDatos = [];
    this.estadisticas.monthlyReportDatos = [];
    this.estadisticas.generalReportDatos = [];
    this.estadisticas.exist = false;
    this.estadisticas.entrysDatos = 0;
  }
}
