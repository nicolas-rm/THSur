import { Component, OnInit } from '@angular/core';
import { TicketInterface } from 'src/app/components/interface/pago.interface';
import { BoxService, OperacionesService, ModoPagoService, TicketService, FirebaseService } from 'src/app/services/index.service';
import { Departamentos } from '../../interface/departamentos';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  modoPagos: any;
  exist = false;
  departamentos = [
    { tornilleria: false, departamento: 'tornilleria', totaltornilleria: 0 },
    { servicios: false, departamento: 'servicios', totalservicios: 0 },
    { refacciones: false, departamento: 'refacciones', totalrefacciones: 0 },
    { ferreteria: false, departamento: 'ferreteria', totalferreteria: 0 }
  ];
  ticket!: TicketInterface;
  constructor(public _modoPago: ModoPagoService, private _operaciones: OperacionesService, public _ticket: TicketService, public _box: BoxService, private _FireStore: FirebaseService) {
  }
  ngOnInit(): void {
    if (this._ticket.valores.especial) {
      this.copiarDatos();
    }
  }

  onchange(event: any) {

    this.dnone(event.target.id);

    this._modoPago.modoPagos[0].forEach((element: any) => {
      if (element.id == event.target.id) {
        element.check = true;
        this.operaciones();
      } else {
        element.check = false;
      }
    });
    this._modoPago.modoPagos[1].forEach((element: any) => {
      if (element.id == event.target.id) {
        element.check = true;
        this.operaciones();
      } else {
        element.check = false;
      }
    });
    this._modoPago.modoPagos[2].forEach((element: any) => {
      if (element.id == event.target.id) {
        element.check = true;
        this.operaciones();
      } else {
        element.check = false;
      }
    });
  }
  operaciones() {
    // if (this._ticket.valores.especial) {
    //   this.copiarDatos();
    // }
    this._ticket.valores = this._operaciones.operaciones(this._ticket.valores);
  }

  restablecer() {
    this._box.mostrar = {
      total: '',
      paga: 'd-none',
      pago: 'd-none',
      resta: 'd-none',
      cambio: 'd-none',
    };
    this._FireStore.update.folio = ''
    this._FireStore.update.exist = false;
    this._box.habilitar('departamentos');
    this._box.habilitar('servicios');
    this._modoPago.restablecer();
    this._ticket.restablecer();
    this.ticket = this._ticket.valores;
  }

  dnone(id: string) {

    if (this._ticket.valores.especial) {
      if (id == 'efectivo') {
        this._box.mostrar.total = '';
        this._box.mostrar.resta = '';
        this._box.mostrar.pago = '';
        this._box.mostrar.paga = '';
        this._box.mostrar.cambio = '';
      } else {
        this._box.mostrar.total = '';
        this._box.mostrar.paga = '';
        this._box.mostrar.resta = '';

        this._box.mostrar.cambio = 'd-none';
        this._box.mostrar.pago = 'd-none';
      }
    } else {
      this._box.mostrar.total = 'd-none';
      this._box.mostrar.resta = 'd-none';
      this._box.mostrar.pago = 'd-none';
      this._box.mostrar.paga = 'd-none';
      this._box.mostrar.cambio = 'd-none';
    }

    this.modopago(id);
    this._ticket.valores.modoPago = '';
    this._ticket.valores.modoPago = id;
  }

  modoPagodefault(valor: boolean) {
    this._ticket.valores.pagoModo.codi = valor;
    this._ticket.valores.pagoModo.credito = valor;
    this._ticket.valores.pagoModo.debito = valor;
    this._ticket.valores.pagoModo.efectivo = valor;
    this._ticket.valores.pagoModo.transferencia = valor;
    this._ticket.valores.pagoModo.vale = valor;
  }

  modopago(id: string) {
    if (id == 'efectivo') {
      this._box.mostrar.pago = '';
      this._box.mostrar.cambio = '';
      this.modoPagodefault(false);
      this._ticket.valores.pagoModo[id] = true;
    }
    if (id == 'debito' || id == 'credito' || id == 'vale' || id == 'codi' || id == 'transferencia') {
      this._box.mostrar.cambio = 'd-none';
      this._box.mostrar.pago = 'd-none';
      this.modoPagodefault(false);
      this._ticket.valores.pagoModo[id] = true;
    }

  }

  data() {

    if (this._ticket.valores.especial) {
      if (this._ticket.valores.Totalabonado == 0) {
        this._ticket.valores.Totalabonado = this._ticket.valores.paga;
        this._ticket.valores.resta = this._ticket.valores.total - this._ticket.valores.Totalabonado;

      } else {
        this._ticket.valores.Totalabonado = this._ticket.valores.Totalabonado + this._ticket.valores.paga;
        this._ticket.valores.resta = this._ticket.valores.total - this._ticket.valores.Totalabonado;
      }
    }

    this._ticket.valores.abonado.push(this._ticket.valores.paga);
  }

  readCollection() {
    // ////  console.log(this.ticket.total);
    if (this._FireStore.update.folio === this._ticket.valores.folio) {
      return;
    } else {
      this.exist = false;
    }

    this.copiarDatos();
    ////  console.log('\n');
    this._FireStore.readCollection(this._ticket.valores.especial, this._ticket.valores.folio).subscribe((documento: Departamentos[]) => {
      if (documento.length > 0) {
        this.configuracionDatos(documento[0]);
        this._FireStore.update.exist = true;
        this._FireStore.update.folio = this._ticket.valores.folio;
        this.exist = true;
        this._FireStore.timerSuccess('Ticket Encontrado.!');
      }


      if (documento.length == 0 && !this.exist) {
        // else {
        this._ticket.restablecerSpecial();
        this._FireStore.update.exist = false;
        this._FireStore.update.folio = '';
        this._FireStore.timerError('Ticket No Encontrado.!');
        // }
      }
    });
  }

  configuracionDatos(ticket: Departamentos) {

    if (this.ticket) {
      this._ticket.restablecerSpecial();
      this._ticket.valores.Totalabonado = this.ticket.Totalabonado;
      this._ticket.valores.abonado = this.ticket.abonado;
      this._ticket.valores.cambio = this.ticket.cambio;
      this._ticket.valores.debe = this.ticket.debe;
      this._ticket.valores.especial = this.ticket.especial;
      this._ticket.valores.folio = this.ticket.folio;
      this._ticket.valores.modoPago = this.ticket.modoPago;
      this._ticket.valores.paga = this.ticket.paga;
      this._ticket.valores.pago = this.ticket.pago;
      this._ticket.valores.pagoModo = this.ticket.pagoModo;
      this._ticket.valores.resta = this.ticket.resta;
      this._ticket.valores.titulo = this.ticket.titulo;
      this._ticket.valores.total = this.ticket.total;
      this._ticket.valores.validate = this.ticket.validate;
      this._ticket.departamentos = this.departamentos;
      ////  console.log(this.ticket);
    } else {
      this._ticket.restablecerSpecial();

    }

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
   //  console.log(this._ticket.departamentos);

    this._ticket.valores.folio = ticket.folio;
    this._ticket.valores.abonado = ticket.abonos;
    this._ticket.valores.resta = ticket.resta;
    // this._ticket.valores.total = this._ticket.valores.total + ticket.total;
    this._ticket.valores.Totalabonado = this.totalAbonos();
    this.operaciones();
  }

  totalAbonos() {
    let suma = 0;
    this._ticket.valores.abonado.forEach((valor) => {
      suma = suma + valor;
    });
    return suma;
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

  copiarDatos() {
    if (this._ticket.copiar == false && this._ticket.contador == 0) {
      if (this._ticket.valores.total > 0) {
        this.ticket = this._ticket.valores;
        this.departamentos = this._ticket.departamentos;

        ////  console.log(this.ticket);
      }
    }
    this._ticket.copiar = true;
    this._ticket.contador = 1;

  }
}
