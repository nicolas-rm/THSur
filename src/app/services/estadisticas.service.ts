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
  private documents!: AngularFirestoreCollection<Departamentos>;
  departamentos = { totaltornilleria: 0, totalservicios: 0, totalrefacciones: 0, totalferreteria: 0 };
  constructor(private FireStore: AngularFirestore, private ticket: TicketService) { }

  dailyReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.snapshotChanges().pipe(map((resp) => {

      for (let index = 0; index < resp.length; index++) {
        let element = resp[index].payload.doc.data();
        const departament = element.departamento;
        const totales = element.totales;
        for (let i = 0; i < departament.length; i++) {
          const valor = departament[i];
          const total = totales[i];
          if (element.resta == 0) {
            if (valor == 'Tornilleria') {
              this.tornilleria(total);
            } else if (valor == 'Servicios') {
              this.servicios(total);
            } else if (valor == 'Refacciones') {
              this.refacciones(total);
            } else if (valor == 'Ferreteria') {
              this.ferreteria(total);
            }
          }

        }
      }
      return this.departamentos;
    }));
  }

  weeklyReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.snapshotChanges().pipe(map((resp) => {

      for (let index = 0; index < resp.length; index++) {
        let element = resp[index].payload.doc.data();
        const departament = element.departamento;
        const totales = element.totales;
        for (let i = 0; i < departament.length; i++) {
          const valor = departament[i];
          const total = totales[i];
          if (element.resta == 0) {
            if (valor == 'Tornilleria') {
              this.tornilleria(total);
            } else if (valor == 'Servicios') {
              this.servicios(total);
            } else if (valor == 'Refacciones') {
              this.refacciones(total);
            } else if (valor == 'Ferreteria') {
              this.ferreteria(total);
            }
          }

        }
      }
      return this.departamentos;
    }));
  }

  monthlyReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.snapshotChanges().pipe(map((resp) => {

      for (let index = 0; index < resp.length; index++) {
        let element = resp[index].payload.doc.data();
        const departament = element.departamento;
        const totales = element.totales;
        for (let i = 0; i < departament.length; i++) {
          const valor = departament[i];
          const total = totales[i];
          if (element.resta == 0) {
            if (valor == 'Tornilleria') {
              this.tornilleria(total);
            } else if (valor == 'Servicios') {
              this.servicios(total);
            } else if (valor == 'Refacciones') {
              this.refacciones(total);
            } else if (valor == 'Ferreteria') {
              this.ferreteria(total);
            }
          }

        }
      }
      return this.departamentos;
    }));
  }

  generalReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.snapshotChanges().pipe(map((resp) => {

      for (let index = 0; index < resp.length; index++) {
        let element = resp[index].payload.doc.data();
        const departament = element.departamento;
        const totales = element.totales;
        for (let i = 0; i < departament.length; i++) {
          const valor = departament[i];
          const total = totales[i];
          if (element.resta == 0) {
            if (valor == 'Tornilleria') {
              this.tornilleria(total);
            } else if (valor == 'Servicios') {
              this.servicios(total);
            } else if (valor == 'Refacciones') {
              this.refacciones(total);
            } else if (valor == 'Ferreteria') {
              this.ferreteria(total);
            }
          }

        }
      }
      return this.departamentos;
    }));
  }

  tornilleria(value: number): void {


    if (this.departamentos.totaltornilleria) {
      this.departamentos.totaltornilleria = Number(this.departamentos.totaltornilleria) + Number(value);
    } else {
      this.departamentos.totaltornilleria = Number(value);
    }

    // console.log('ENTRO 1');
  }

  refacciones(value: number): void {
    // this.departamentos.refacciones = true;
    if (this.departamentos.totalrefacciones) {
      this.departamentos.totalrefacciones = Number(this.departamentos.totalrefacciones) + Number(value);
    } else {
      this.departamentos.totalrefacciones = Number(value);
    }
    // console.log('ENTRO 2');
  }

  ferreteria(value: number): void {
    // this.departamentos.ferreteria = true;
    if (this.departamentos.totalferreteria) {
      this.departamentos.totalferreteria = Number(this.departamentos.totalferreteria) + Number(value);
    } else {
      this.departamentos.totalferreteria = Number(value);
    }
    // console.log('ENTRO 3');
  }

  servicios(value: number): void {
    // this.departamentos.servicios = true;
    if (this.departamentos.totalservicios) {
      this.departamentos.totalservicios = Number(this.departamentos.totalservicios) + Number(value);
    } else {
      this.departamentos.totalservicios = Number(value);
    }
    // console.log('ENTRO 4');
  }
}
