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
  constructor(private FireStore: AngularFirestore, private ticket: TicketService) { }

  dailyReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.snapshotChanges().pipe(map((resp) => {
      const departamentos = [
        { tornilleria: false, departamento: 'tornilleria', totaltornilleria: 0 },
        { servicios: false, departamento: 'servicios', totalservicios: 0 },
        { refacciones: false, departamento: 'refacciones', totalrefacciones: 0 },
        { ferreteria: false, departamento: 'ferreteria', totalferreteria: 0 }
      ];
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index].payload.doc.data();

        if (collection === 'THSureste-Abonos') {
          if (element.resta === 0) {
            for (let i = 0; i < element.departamento.length; i++) {
              const dep = element.departamento[i];
              this.assignation(dep, element, i);

            }
          }
        }
        if (collection === 'THSureste-Contado') {
          for (let i = 0; i < element.departamento.length; i++) {
            const dep = element.departamento[i];
            this.assignation(dep, element, i);
          }
        }
      }
      departamentos[0] = this.ticket.departamentos[0];
      this.ticket.restablecer();
      return departamentos;
    }));
  }

  weeklyReport() {

  }

  monthlyReport() {

  }

  generalReport(collection: string) {
    this.documents = this.FireStore.collection<Departamentos>(collection);
    return this.documents.snapshotChanges().pipe(map((resp) => {
      const departamentos = [
        { tornilleria: false, departamento: 'tornilleria', totaltornilleria: 0 },
        { servicios: false, departamento: 'servicios', totalservicios: 0 },
        { refacciones: false, departamento: 'refacciones', totalrefacciones: 0 },
        { ferreteria: false, departamento: 'ferreteria', totalferreteria: 0 }
      ];
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index].payload.doc.data();
        console.log(element);
        if (collection == 'THSureste-Abonos') {
          if (element.resta === 0) {
            for (let i = 0; i < element.departamento.length; i++) {
              const dep = element.departamento[i];
              this.assignation(dep, element, i);

            }
          }
        }
        if (collection == 'THSureste-Contado') {
          for (let i = 0; i < element.departamento.length; i++) {
            const dep = element.departamento[i];
            this.assignation(dep, element, i);
          }
        }
      }
      departamentos[0] = this.ticket.departamentos[0];
      this.ticket.restablecer();
      console.log(departamentos);
      return departamentos;
    }));
  }

  assignation(dep: string, element: Departamentos, i: number) {
    if (dep == 'Tornilleria') {
      this.ticket.tornilleria(element.totales[i]);
    }
    if (dep == 'Ferreteria') {
      this.ticket.ferreteria(element.totales[i]);
    }
    if (dep == 'Refacciones') {
      this.ticket.refacciones(element.totales[i]);
    }
    if (dep == 'Servicios') {
      this.ticket.servicios(element.totales[i]);
    }
  }


}
