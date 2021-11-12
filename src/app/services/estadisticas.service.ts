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
  // departamentos = { totaltornilleria: 0, totalservicios: 0, totalrefacciones: 0, totalferreteria: 0 };
  constructor(private FireStore: AngularFirestore, private ticket: TicketService) {

  }


  dailyReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.valueChanges().pipe(map((resp) => {
      this.assignation(resp, 'today');
      if (this.dailyReportDatos.length == 0 || this.dailyReportDatos.length < 0 || this.dailyReportDatos.length == null || this.dailyReportDatos == [] || !this.dailyReportDatos) {
        this.dailyReportDatos[0] = 0;
        this.dailyReportDatos[1] = 0;
        this.dailyReportDatos[2] = 0;
        this.dailyReportDatos[3] = 0;
      }

      if (!this.dailyReportDatos[0]) {
        this.dailyReportDatos[0] = 0;
      }
      if (!this.dailyReportDatos[1]) {
        this.dailyReportDatos[1] = 0;
      }
      if (!this.dailyReportDatos[2]) {
        this.dailyReportDatos[2] = 0;
      }
      if (!this.dailyReportDatos[3]) {
        this.dailyReportDatos[3] = 0;
      }
      console.log(this.dailyReportDatos);
      return this.dailyReportDatos;
    }));
  }

  weeklyReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.valueChanges().pipe(map((resp) => {
      this.assignation(resp), 'semanal';
      if (this.weeklyReportDatos.length < 0 || this.weeklyReportDatos.length == null || this.weeklyReportDatos == [] || this.weeklyReportDatos.length == 0) {
        this.weeklyReportDatos[0] = 0;
        this.weeklyReportDatos[1] = 0;
        this.weeklyReportDatos[2] = 0;
        this.weeklyReportDatos[3] = 0;
      }
      return this.weeklyReportDatos;
    }));
  }

  monthlyReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.valueChanges().pipe(map((resp) => {
      this.assignation(resp, 'mensual');
      if (this.monthlyReportDatos.length < 0 || this.monthlyReportDatos.length == null || this.weeklyReportDatos == [] || this.weeklyReportDatos.length == 0) {
        this.monthlyReportDatos[0] = 0;
        this.monthlyReportDatos[1] = 0;
        this.monthlyReportDatos[2] = 0;
        this.monthlyReportDatos[3] = 0;
      }

      if(!this.monthlyReportDatos[0]){
        this.monthlyReportDatos[0] = 0;
      }
      if(!this.monthlyReportDatos[1]){
        this.monthlyReportDatos[1] = 0;
      }
      if(!this.monthlyReportDatos[2]){
        this.monthlyReportDatos[2] = 0;
      }
      if(!this.monthlyReportDatos[3]){
        this.monthlyReportDatos[3] = 0;
      }
      return this.monthlyReportDatos;
    }));
  }

  generalReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.valueChanges().pipe(map((resp) => {
      this.assignation(resp, 'todo');
      if (this.generalReportDatos.length < 0 || this.generalReportDatos.length == null || this.weeklyReportDatos == [] || this.weeklyReportDatos.length == 0) {
        this.generalReportDatos[0] = 0;
        this.generalReportDatos[1] = 0;
        this.generalReportDatos[2] = 0;
        this.generalReportDatos[3] = 0;
      }

      if(!this.generalReportDatos[0]){
        this.generalReportDatos[0] = 0;
      }
      if(!this.generalReportDatos[1]){
        this.generalReportDatos[1] = 0;
      }
      if(!this.generalReportDatos[2]){
        this.generalReportDatos[2] = 0;
      }
      if(!this.generalReportDatos[3]){
        this.generalReportDatos[3] = 0;
      }
      return this.generalReportDatos;
    }));
  }

  assignation(resp: Departamentos[], seccion?: string) {
    if (!this.exist) {

      for (let index = 0; index < resp.length; index++) {
        for (let i = 0; i < resp[index].departamento.length; i++) {
          if (resp[index].resta == 0 && i < resp[index].departamento.length) {
            if (seccion == 'today') {
              const hoy = new Date().toLocaleString().split(' ')[0];
              const date = new Date(convertTimestamp(resp[index].fecha)).toLocaleString().split(' ')[0];
              if (hoy == date) {
                if (resp[index].departamento[i] == 'Tornilleria') {
                  if (this.dailyReportDatos[0]) {
                    this.dailyReportDatos[0] += resp[index].totales[i];
                  }
                  if (!this.dailyReportDatos[0]) {
                    this.dailyReportDatos[0] = resp[index].totales[i]
                  }
                }
                if (resp[index].departamento[i] == 'Servicios') {
                  if (this.dailyReportDatos[1]) {
                    this.dailyReportDatos[1] += resp[index].totales[i];
                  }
                  if (!this.dailyReportDatos[1]) {
                    this.dailyReportDatos[1] = resp[index].totales[i];
                  }
                }
                if (resp[index].departamento[i] == 'Refacciones') {
                  if (this.dailyReportDatos[2]) {
                    this.dailyReportDatos[2] += resp[index].totales[i];

                  }
                  if (!this.dailyReportDatos[2]) {
                    this.dailyReportDatos[2] = resp[index].totales[i];
                  }
                }
                if (resp[index].departamento[i] == 'Ferreteria') {
                  if (this.dailyReportDatos[3]) {
                    this.dailyReportDatos[3] += resp[index].totales[i];
                  }
                  if (!this.dailyReportDatos[3]) {
                    this.dailyReportDatos[3] = resp[index].totales[i];
                  }
                }
              }
            }
            if (seccion == 'semanal') {
              ////  console.log('entro a semana');

            }
            if (seccion == 'mensual') {

              let hoy = new Date().toLocaleString().split(' ')[0].split('/');
              hoy[0] = hoy[2] + '/' + hoy[1];
              let date = new Date(convertTimestamp(resp[index].fecha)).toLocaleString().split(' ')[0].split('/');
              date[0] = date[2] + '/' + date[1];

              if (hoy[0] == date[0]) {
                ////  console.log('entro a mensual');
                if (resp[index].departamento[i] == 'Tornilleria') {
                  if (this.monthlyReportDatos[0]) {
                    this.monthlyReportDatos[0] += resp[index].totales[i];
                    //  console.log('1.- TORNILLERIA: ' + resp[index].totales[i]);
                  }
                  if (!this.monthlyReportDatos[0]) {
                    this.monthlyReportDatos[0] = resp[index].totales[i];
                    // this.monthlyReportDatos[0] += resp[index].totales[i];
                    //  console.log('2.- TORNILLERIA: ' + resp[index].totales[i]);
                  }
                }
                if (resp[index].departamento[i] == 'Servicios') {
                  if (this.monthlyReportDatos[1]) {
                    this.monthlyReportDatos[1] += resp[index].totales[i];
                    //  console.log('1.- SERVICIOS: ' + resp[index].totales[i]);
                  }
                  if (!this.monthlyReportDatos[1]) {
                    this.monthlyReportDatos[1] = resp[index].totales[i];
                    // this.monthlyReportDatos[1] += resp[index].totales[i];
                    //  console.log('2.- SERVICIOS: ' + resp[index].totales[i]);
                  }
                }
                if (resp[index].departamento[i] == 'Refacciones') {
                  if (this.monthlyReportDatos[2]) {
                    this.monthlyReportDatos[2] += resp[index].totales[i];
                    //  console.log('1.- REFACCIONES: ' + resp[index].totales[i]);
                  }
                  if (!this.monthlyReportDatos[2]) {
                    this.monthlyReportDatos[2] = resp[index].totales[i];
                    // this.monthlyReportDatos[2] += resp[index].totales[i];
                    //  console.log('2.- REFACCIONES: ' + resp[index].totales[i]);
                  }
                }
                if (resp[index].departamento[i] == 'Ferreteria') {
                  if (this.monthlyReportDatos[3]) {
                    this.monthlyReportDatos[3] += resp[index].totales[i];
                    //  console.log('1.- FERRETERIA: ' + resp[index].totales[i]);
                  }
                  if (!this.monthlyReportDatos[3]) {
                    this.monthlyReportDatos[3] = resp[index].totales[i];
                    // this.monthlyReportDatos[3] += ;
                    //  console.log('2.- FERRETERIA: ' + resp[index].totales[i]);
                  }
                }
              }
            }
            if (seccion == 'todo') {
              ////  console.log('entro a todo');
              if (resp[index].departamento[i] == 'Tornilleria') {
                if (this.generalReportDatos[0]) {
                  this.generalReportDatos[0] += resp[index].totales[i];
                  //  console.log('1.- TORNILLERIA: ' + resp[index].totales[i]);
                }
                if (!this.generalReportDatos[0]) {
                  this.generalReportDatos[0] = resp[index].totales[i];
                  // this.generalReportDatos[0] += resp[index].totales[i];
                  //  console.log('2.- TORNILLERIA: ' + resp[index].totales[i]);
                }
              }
              if (resp[index].departamento[i] == 'Servicios') {
                if (this.generalReportDatos[1]) {
                  this.generalReportDatos[1] += resp[index].totales[i];
                  //  console.log('1.- SERVICIOS: ' + resp[index].totales[i]);
                }
                if (!this.generalReportDatos[1]) {
                  this.generalReportDatos[1] = resp[index].totales[i];
                  // this.generalReportDatos[1] += resp[index].totales[i];
                  //  console.log('2.- SERVICIOS: ' + resp[index].totales[i]);
                }
              }
              if (resp[index].departamento[i] == 'Refacciones') {
                if (this.generalReportDatos[2]) {
                  this.generalReportDatos[2] += resp[index].totales[i];
                  //  console.log('1.- REFACCIONES: ' + resp[index].totales[i]);
                }
                if (!this.generalReportDatos[2]) {
                  this.generalReportDatos[2] = resp[index].totales[i];
                  // this.generalReportDatos[2] += resp[index].totales[i];
                  //  console.log('2.- REFACCIONES: ' + resp[index].totales[i]);
                }
              }
              if (resp[index].departamento[i] == 'Ferreteria') {
                if (this.generalReportDatos[3]) {
                  this.generalReportDatos[3] += resp[index].totales[i];
                  //  console.log('1.- FERRETERIA: ' + resp[index].totales[i]);
                }
                if (!this.generalReportDatos[3]) {
                  this.generalReportDatos[3] = resp[index].totales[i];
                  // this.generalReportDatos[3] += ;
                  //  console.log('2.- FERRETERIA: ' + resp[index].totales[i]);
                }
              }
            }
          }
        }
      }
    }
    ////  console.log(this.departamentos);
  }

  dateMonth(month: number, year: number) {
    function daysInMonth(humanMonth: number, year: number) {
      return new Date(year || new Date().getFullYear(), (humanMonth + 1), 0).getDate();
    }
    const date = new Date(year, month, daysInMonth(month, year));
    return date;
  }
  restablecer() {
    this.dailyReportDatos = [];
    this.weeklyReportDatos = [];
    this.monthlyReportDatos = [];
    this.generalReportDatos = [];
  }

}
