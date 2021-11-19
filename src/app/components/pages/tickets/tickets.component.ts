import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Departamentos } from '../../interface/departamentos';
import { TicketService } from '../../../services/ticketservices/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  collectionesAbono!: Array<Departamentos>;
  collectionesContado!: Array<Departamentos>;
  folioSearch: string = '';
  fecha: string = '';
  exist: boolean = false;
  folio: string = '';
  devolucion: number = 0;
  especial: boolean = false;
  constructor(private _FireStore: FirebaseService, private _ticket: TicketService) { }

  ngOnInit(): void {
    this.readCollection();

  }

  search(folio: string) {

    if (folio == ' ' || folio == '\r' || folio == '\t' || folio == '\s' || folio == '\n' || folio == null) {
      this.readCollection();
    }
    if (folio.length < 3) {
      return;
    }

    this._FireStore.readCollection(true, folio).subscribe((collectiones) => {
      this.collectionesAbono = [];
      // this.folio = '';
      this.especial = true;
      this.devolucion = 0;
      this.collectionesAbono = collectiones;
    });
    this._FireStore.readCollection(false, folio).subscribe((collectiones) => {
      this.collectionesContado = [];
      // this.folio = '';
      this.especial = false;
      this.devolucion = 0;
      this.collectionesContado = collectiones;
    });
  }

  delete(folio: string, especial: boolean, devolucion: number) {
    this.folio = folio;
    this.especial = especial;
    this.devolucion = devolucion;
  }

  confirmarDelete() {
    this._FireStore.deleteCollection(this.folio, this.especial);
  }

  load(ticket: Departamentos) {
    // // // console.log(ticket);
    this._ticket.valores.Totalabonado = ticket.totalAbonado;
    this._ticket.valores.abonado = ticket.abonos;
    this._ticket.valores.cambio = ticket.cambio;
    this._ticket.valores.debe = ticket.resta;
    this._ticket.valores.especial = ticket.especial;
    this._ticket.valores.folio = ticket.folio;
    this._ticket.valores.modoPago = ticket.modoPago;
    this._ticket.valores.paga = ticket.paga;
    this._ticket.valores.pago = ticket.pago;
    // this._ticket.valores.pagoModo = ticket.modoPago;
    this._ticket.valores.resta = ticket.resta;
    // this._ticket.valores.titulo = ticket.titulo;
    this._ticket.valores.total = ticket.total;
    // // // console.log(this._ticket.valores);
    // this._ticket.valores.validate = ticket.validate;
    // this._ticket.departamentos = this.departamentos;


    for (let i = 0; i < ticket.departamento.length; i++) {
      if (ticket.departamento[i] == 'Tornilleria') {
        this.tornilleria(ticket.totales[i]);
      }
      if (ticket.departamento[i] == 'Ferreteria') {
        this.ferreteria(ticket.totales[i]);
      }
      if (ticket.departamento[i] == 'Refacciones') {
        this.refacciones(ticket.totales[i]);
      }
      if (ticket.departamento[i] == 'Servicios') {
        this.servicios(ticket.totales[i]);
      }
    }
    // // // console.log(ticket.fecha);
    this._ticket.valores.fecha = ticket.fecha;
    this._ticket.reimprimir = true;
  }
  tornilleria(value: any): void {
    this._ticket.tornilleria(value);
  }

  refacciones(value: any): void {
    this._ticket.refacciones(value);
  }

  ferreteria(value: any): void {
    this._ticket.ferreteria(value);
  }

  servicios(value: any): void {
    this._ticket.servicios(value);
  }

  readCollection() {

    this._FireStore.abonos().subscribe((collectiones: Departamentos[]) => {
      this.collectionesAbono = [];
      collectiones.forEach(element => {
        if (element.especial == true) {
          this.collectionesAbono.push(element);
        }
        if (element.especial == false) {
          const doc = element;
          this._FireStore.createCollection(doc, false);
          this._FireStore.deleteCollection(doc.folio, true);
        }
      });
      // }
      // this.search('');
    });
    this._FireStore.contado().subscribe((collectiones: Departamentos[]) => {
      this.collectionesContado = [];
      collectiones.forEach(element => {
        if (element.especial == false) {
          this.collectionesContado.push(element);
        }
        if (element.especial == true) {
          const doc = element;
          this._FireStore.createCollection(doc, true);
          this._FireStore.deleteCollection(doc.folio, false);
        }
      });
    });
  }
}

