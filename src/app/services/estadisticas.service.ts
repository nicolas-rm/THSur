import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { convertTimestamp } from 'convert-firebase-timestamp';
import { map } from 'rxjs/operators';
import { Departamentos } from '../components/interface/departamentos';
import { TicketService } from 'src/app/services/index.service';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  generalReportDatos: Array<number> = [];
  monthlyReportDatos: Array<number> = [];
  weeklyReportDatos: Array<number> = [];
  dailyReportDatos: Array<number> = [];

  exist: boolean = false;
  private documents!: AngularFirestoreCollection<Departamentos>;
  departamentos = { totaltornilleria: 0, totalservicios: 0, totalrefacciones: 0, totalferreteria: 0 };
  constructor(private FireStore: AngularFirestore, private ticket: TicketService) {

  }


  dailyReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.valueChanges().pipe(map((resp) => {
      this.assignation(resp, 'today');
      return this.dailyReportDatos;
    }));
  }

  weeklyReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.valueChanges().pipe(map((resp) => {
      this.assignation(resp), 'semanal';
      return this.weeklyReportDatos;
    }));
  }

  monthlyReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.valueChanges().pipe(map((resp) => {
      this.assignation(resp, 'mensual');
      return this.monthlyReportDatos;
    }));
  }

  generalReport(collection: string) {
    // this.generalReportDatos = [];
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.valueChanges().pipe(map((resp) => {
      this.assignation(resp, 'todo');
      return this.generalReportDatos;
    }));
  }

  assignation(resp: Departamentos[], seccion?: string) {
    // console.log(seccion);
    for (let index = 0; index < resp.length; index++) {
      for (let i = 0; i < resp[index].departamento.length; i++) {
        if (resp[index].resta == 0 && i < resp[index].departamento.length) {
          if (seccion == 'today') {
            const hoy = new Date().toLocaleString().split(' ')[0];
            const date = new Date(convertTimestamp(resp[index].fecha)).toLocaleString().split(' ')[0];
            // console.log(hoy);
            // console.log(date);
            if (hoy == date) {
              if (resp[index].departamento[i] == 'Tornilleria') {
                if (this.dailyReportDatos[0]) {
                  this.dailyReportDatos[0] += resp[index].totales[i];
                  console.log('1.- TORNILLERIA: ' + resp[index].totales[i]);
                  // this.tornilleria(resp[index].totales[i]);
                }
                if (!this.dailyReportDatos[0]) {
                  this.dailyReportDatos[0] = resp[index].totales[i];
                  // this.dailyReportDatos[0] += resp[index].totales[i];
                  console.log('2.- TORNILLERIA: ' + resp[index].totales[i]);
                  // this.tornilleria(resp[index].totales[i]);
                }
              }
              if (resp[index].departamento[i] == 'Servicios') {
                if (this.dailyReportDatos[1]) {
                  this.dailyReportDatos[1] += resp[index].totales[i];
                  console.log('1.- SERVICIOS: ' + resp[index].totales[i]);
                  // this.servicios(resp[index].totales[i]);
                }
                if (!this.dailyReportDatos[1]) {
                  this.dailyReportDatos[1] = resp[index].totales[i];
                  // this.dailyReportDatos[1] += resp[index].totales[i];
                  console.log('2.- SERVICIOS: ' + resp[index].totales[i]);
                  // this.servicios(resp[index].totales[i]);

                }
              }
              if (resp[index].departamento[i] == 'Refacciones') {
                if (this.dailyReportDatos[2]) {
                  this.dailyReportDatos[2] += resp[index].totales[i];
                  console.log('1.- REFACCIONES: ' + resp[index].totales[i]);
                  // this.refacciones(resp[index].totales[i]);

                }
                if (!this.dailyReportDatos[2]) {
                  this.dailyReportDatos[2] = resp[index].totales[i];
                  // this.dailyReportDatos[2] += resp[index].totales[i];
                  console.log('2.- REFACCIONES: ' + resp[index].totales[i]);
                  // this.refacciones(resp[index].totales[i]);

                }
              }
              if (resp[index].departamento[i] == 'Ferreteria') {
                if (this.dailyReportDatos[3]) {
                  this.dailyReportDatos[3] += resp[index].totales[i];
                  console.log('1.- FERRETERIA: ' + resp[index].totales[i]);
                  // this.ferreteria(resp[index].totales[i]);
                }
                if (!this.dailyReportDatos[3]) {
                  this.dailyReportDatos[3] = resp[index].totales[i];
                  // this.dailyReportDatos[3] += ;
                  console.log('2.- FERRETERIA: ' + resp[index].totales[i]);
                  // this.ferreteria(resp[index].totales[i]);
                }
              }
            }
          }
          if (seccion == 'semanal') {
            // console.log('entro a semana');

          }
          if (seccion == 'mensual') {

            let hoy = new Date().toLocaleString().split(' ')[0].split('/');
            hoy[0] = hoy[2] + '/' + hoy[1];
            let date = new Date(convertTimestamp(resp[index].fecha)).toLocaleString().split(' ')[0].split('/');
            date[0] = date[2] + '/' + date[1];

            if (hoy[0] == date[0]) {
              // console.log('entro a mensual');

              if (resp[index].departamento[i] == 'Tornilleria') {
                if (this.monthlyReportDatos[0]) {
                  this.monthlyReportDatos[0] += resp[index].totales[i];
                  console.log('1.- TORNILLERIA: ' + resp[index].totales[i]);
                }
                if (!this.monthlyReportDatos[0]) {
                  this.monthlyReportDatos[0] = resp[index].totales[i];
                  // this.monthlyReportDatos[0] += resp[index].totales[i];
                  console.log('2.- TORNILLERIA: ' + resp[index].totales[i]);
                }
              }
              if (resp[index].departamento[i] == 'Servicios') {
                if (this.monthlyReportDatos[1]) {
                  this.monthlyReportDatos[1] += resp[index].totales[i];
                  console.log('1.- SERVICIOS: ' + resp[index].totales[i]);
                }
                if (!this.monthlyReportDatos[1]) {
                  this.monthlyReportDatos[1] = resp[index].totales[i];
                  // this.monthlyReportDatos[1] += resp[index].totales[i];
                  console.log('2.- SERVICIOS: ' + resp[index].totales[i]);
                }
              }
              if (resp[index].departamento[i] == 'Refacciones') {
                if (this.monthlyReportDatos[2]) {
                  this.monthlyReportDatos[2] += resp[index].totales[i];
                  console.log('1.- REFACCIONES: ' + resp[index].totales[i]);
                }
                if (!this.monthlyReportDatos[2]) {
                  this.monthlyReportDatos[2] = resp[index].totales[i];
                  // this.monthlyReportDatos[2] += resp[index].totales[i];
                  console.log('2.- REFACCIONES: ' + resp[index].totales[i]);
                }
              }
              if (resp[index].departamento[i] == 'Ferreteria') {
                if (this.monthlyReportDatos[3]) {
                  this.monthlyReportDatos[3] += resp[index].totales[i];
                  console.log('1.- FERRETERIA: ' + resp[index].totales[i]);
                }
                if (!this.monthlyReportDatos[3]) {
                  this.monthlyReportDatos[3] = resp[index].totales[i];
                  // this.monthlyReportDatos[3] += ;
                  console.log('2.- FERRETERIA: ' + resp[index].totales[i]);
                }
              }
            }
          }
          if (seccion == 'todo') {
            // console.log('entro a todo');
            if (resp[index].departamento[i] == 'Tornilleria') {
              if (this.generalReportDatos[0]) {
                this.generalReportDatos[0] += resp[index].totales[i];
                console.log('1.- TORNILLERIA: ' + resp[index].totales[i]);
              }
              if (!this.generalReportDatos[0]) {
                this.generalReportDatos[0] = resp[index].totales[i];
                // this.generalReportDatos[0] += resp[index].totales[i];
                console.log('2.- TORNILLERIA: ' + resp[index].totales[i]);
              }
            }
            if (resp[index].departamento[i] == 'Servicios') {
              if (this.generalReportDatos[1]) {
                this.generalReportDatos[1] += resp[index].totales[i];
                console.log('1.- SERVICIOS: ' + resp[index].totales[i]);
              }
              if (!this.generalReportDatos[1]) {
                this.generalReportDatos[1] = resp[index].totales[i];
                // this.generalReportDatos[1] += resp[index].totales[i];
                console.log('2.- SERVICIOS: ' + resp[index].totales[i]);
              }
            }
            if (resp[index].departamento[i] == 'Refacciones') {
              if (this.generalReportDatos[2]) {
                this.generalReportDatos[2] += resp[index].totales[i];
                console.log('1.- REFACCIONES: ' + resp[index].totales[i]);
              }
              if (!this.generalReportDatos[2]) {
                this.generalReportDatos[2] = resp[index].totales[i];
                // this.generalReportDatos[2] += resp[index].totales[i];
                console.log('2.- REFACCIONES: ' + resp[index].totales[i]);
              }
            }
            if (resp[index].departamento[i] == 'Ferreteria') {
              if (this.generalReportDatos[3]) {
                this.generalReportDatos[3] += resp[index].totales[i];
                console.log('1.- FERRETERIA: ' + resp[index].totales[i]);
              }
              if (!this.generalReportDatos[3]) {
                this.generalReportDatos[3] = resp[index].totales[i];
                // this.generalReportDatos[3] += ;
                console.log('2.- FERRETERIA: ' + resp[index].totales[i]);
              }
            }
          }
        }
      }
    }
    // console.log(this.departamentos);
  }

  dateMonth(month: number, year: number) {
    function daysInMonth(humanMonth: number, year: number) {
      return new Date(year || new Date().getFullYear(), (humanMonth + 1), 0).getDate();
    }
    const date = new Date(year, month, daysInMonth(month, year));
    return date;
  }
  tornilleria(value: number): void {
    if (this.departamentos.totaltornilleria) {
      this.departamentos.totaltornilleria += Number(value);
    } else {
      this.departamentos.totaltornilleria = Number(value);
    }
  }

  refacciones(value: number): void {
    if (this.departamentos.totalrefacciones) {
      this.departamentos.totalrefacciones += Number(value);
    } else {
      this.departamentos.totalrefacciones = Number(value);
    }
  }

  ferreteria(value: number): void {
    if (this.departamentos.totalferreteria) {
      this.departamentos.totalferreteria += Number(value);
    } else {
      this.departamentos.totalferreteria = Number(value);
    }
  }

  servicios(value: number): void {
    if (this.departamentos.totalservicios) {
      this.departamentos.totalservicios += Number(value);
    } else {
      this.departamentos.totalservicios = Number(value);
    }
  }

}
