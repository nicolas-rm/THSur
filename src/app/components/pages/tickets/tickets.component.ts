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
  collectiones!: Array<Departamentos>;
  folioSearch: string = '';
  fecha: string = '';
  constructor(private _FireStore: FirebaseService, private _ticket: TicketService) { }

  ngOnInit(): void {
    this.collectiones = [];
    this._FireStore.readCollections(true).subscribe((collectiones: Departamentos[]) => {
      if (collectiones.length > 0) {
        this.collectiones = collectiones;
      }
    });
    this._FireStore.readCollections(false).subscribe((collectiones: Departamentos[]) => {
      if (collectiones.length > 0) {
        this.collectiones = collectiones;
      }
    });


    // this.collectiones = this._FireStore.readCollections(true);
  }

  search(folio: string) {
    this.collectiones = [];
    if (this.folioSearch == '' || this.folioSearch == null || this.folioSearch == undefined) {
      this.ngOnInit();
    }

    if (folio.length < 3) {
      return;
    }
    this._FireStore.readCollection(true, folio).subscribe((collectiones) => {
      if (collectiones.length > 0) {
        this.collectiones = collectiones;
      }
    });
    this._FireStore.readCollection(false, folio).subscribe((collectiones) => {
      if (collectiones.length > 0) {
        this.collectiones = collectiones;
      }
    });
  }

  load(ticket: Departamentos) {
    console.log(ticket);
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
    console.log(ticket.fecha);
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
}
