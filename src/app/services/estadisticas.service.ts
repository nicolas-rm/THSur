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
  exist: boolean = false;
  private documents!: AngularFirestoreCollection<Departamentos>;
  departamentos = { totaltornilleria: 0, totalservicios: 0, totalrefacciones: 0, totalferreteria: 0 };
  constructor(private FireStore: AngularFirestore, private ticket: TicketService) { }

  dailyReport(collection: string) {
    this.departamentos = this.departamentos = { totaltornilleria: 0, totalservicios: 0, totalrefacciones: 0, totalferreteria: 0 };

    const today = new Date((new Date().getFullYear()), (new Date().getMonth() + 1), (new Date().getDate())).toLocaleString().split(' ')[0];
    this.documents = this.FireStore.collection<Departamentos>(collection, ref => ref.where('resta', '==', 0));
    return this.documents.valueChanges().pipe(map((resp) => {
      this.assignation(resp, 'today');
      return this.departamentos;
    }));
  }

  weeklyReport(collection: string) {
    this.departamentos = this.departamentos = { totaltornilleria: 0, totalservicios: 0, totalrefacciones: 0, totalferreteria: 0 };
    this.documents = this.FireStore.collection<Departamentos>(collection, ref => ref.where('resta', '==', 0));
    return this.documents.valueChanges().pipe(map((resp) => {
      this.assignation(resp), 'semanal';
      return this.departamentos;
    }));
  }

  monthlyReport(collection: string) {
    this.departamentos = this.departamentos = { totaltornilleria: 0, totalservicios: 0, totalrefacciones: 0, totalferreteria: 0 };
    const start = new Date((new Date().getFullYear()), (new Date().getMonth()), (new Date().getDate() - (new Date().getDate() - 1))).toLocaleString().split(' ')[0];
    const end = this.dateMonth(new Date().getMonth(), new Date().getFullYear()).toLocaleString().split(' ')[0];
    const month1 = new Date().getMonth() + '/' + new Date().getFullYear();
    const month2 = (new Date().getFullYear()) + '/' + (new Date().getMonth() + 1);

    this.documents = this.FireStore.collection<Departamentos>(collection, ref => ref.where('resta', '==', 0));
    return this.documents.valueChanges().pipe(map((resp) => {
      this.assignation(resp, 'mensual');
      return this.departamentos;
    }));
  }

  generalReport(collection: string) {
    this.departamentos = this.departamentos = { totaltornilleria: 0, totalservicios: 0, totalrefacciones: 0, totalferreteria: 0 };
    this.documents = this.FireStore.collection<Departamentos>(collection, ref => ref.where('resta', '==', 0));
    return this.documents.valueChanges().pipe(map((resp) => {
      this.assignation(resp, 'todo');
      return this.departamentos;
    }));
  }

  assignation(resp: Departamentos[], seccion?: string) {
    console.log(seccion);
    for (let index = 0; index < resp.length; index++) {
      // if (!this.exist) {
      for (let i = 0; i < resp[index].departamento.length; i++) {
        if (resp[index].resta == 0) {
          if (seccion) {
            if (seccion == 'today') {
              const hoy = new Date().toLocaleString().split(' ')[0];
              console.log(hoy);
              const date = new Date(convertTimestamp(resp[index].fecha)).toLocaleString().split(' ')[0];
              console.log(date);
              if (hoy == date) {
                console.log('entro a hoy');
                if (resp[index].departamento[i] == 'Tornilleria') {
                  this.tornilleria(resp[index].totales[i]);
                }
                if (resp[index].departamento[i] == 'Servicios') {
                  this.servicios(resp[index].totales[i]);
                }
                if (resp[index].departamento[i] == 'Refacciones') {
                  this.refacciones(resp[index].totales[i]);
                }
                if (resp[index].departamento[i] == 'Ferreteria') {
                  this.ferreteria(resp[index].totales[i]);
                }
              }
            }
            if (seccion == 'semanal') {
              console.log('entro a semana');

            }
            if (seccion == 'mensual') {

              let hoy = new Date().toLocaleString().split(' ')[0].split('/');
              hoy[0] = hoy[2] + '/' + hoy[1];
              // console.log(hoy[0]);
              let date = new Date(convertTimestamp(resp[index].fecha)).toLocaleString().split(' ')[0].split('/');
              date[0] = date[2] + '/' + date[1];
              // console.log(date[0]);

              if (hoy[0] == date[0]) {
                console.log('entro a mensual');

                if (resp[index].departamento[i] == 'Tornilleria') {
                  this.tornilleria(resp[index].totales[i]);
                }
                if (resp[index].departamento[i] == 'Servicios') {
                  this.servicios(resp[index].totales[i]);
                }
                if (resp[index].departamento[i] == 'Refacciones') {
                  this.refacciones(resp[index].totales[i]);
                }
                if (resp[index].departamento[i] == 'Ferreteria') {
                  this.ferreteria(resp[index].totales[i]);
                }
              }
            }
            if (seccion == 'todo') {
              console.log('entro a todo');
              if (resp[index].departamento[i] == 'Tornilleria') {
                this.tornilleria(resp[index].totales[i]);
              }
              if (resp[index].departamento[i] == 'Servicios') {
                this.servicios(resp[index].totales[i]);
              }
              if (resp[index].departamento[i] == 'Refacciones') {
                this.refacciones(resp[index].totales[i]);
              }
              if (resp[index].departamento[i] == 'Ferreteria') {
                this.ferreteria(resp[index].totales[i]);
              }
            }
          }
        }
      }
      // if (index == resp.length) {
      //   this.exist = true;
      // }
      // }
    }
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
      this.departamentos.totaltornilleria = Number(this.departamentos.totaltornilleria) + Number(value);
    } else {
      this.departamentos.totaltornilleria = Number(value);
    }
  }

  refacciones(value: number): void {
    if (this.departamentos.totalrefacciones) {
      this.departamentos.totalrefacciones = Number(this.departamentos.totalrefacciones) + Number(value);
    } else {
      this.departamentos.totalrefacciones = Number(value);
    }
  }

  ferreteria(value: number): void {
    if (this.departamentos.totalferreteria) {
      this.departamentos.totalferreteria = Number(this.departamentos.totalferreteria) + Number(value);
    } else {
      this.departamentos.totalferreteria = Number(value);
    }
  }

  servicios(value: number): void {
    if (this.departamentos.totalservicios) {
      this.departamentos.totalservicios = Number(this.departamentos.totalservicios) + Number(value);
    } else {
      this.departamentos.totalservicios = Number(value);
    }
  }
}
