import { Injectable } from '@angular/core';
import { TicketInterface } from 'src/app/components/interface/pago.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  copiar: boolean = false;
  contador: number = 0;
  departamentos = [
    { tornilleria: false, departamento: 'tornilleria', totaltornilleria: 0 },
    { servicios: false, departamento: 'servicios', totalservicios: 0 },
    { refacciones: false, departamento: 'refacciones', totalrefacciones: 0 },
    { ferreteria: false, departamento: 'ferreteria', totalferreteria: 0 }
  ];

  valores: TicketInterface = {
    especial: false,
    folio: '',
    total: 0,
    abonado: [],
    Totalabonado: 0,
    paga: 0,
    resta: 0,
    debe: 0,
    cambio: 0,
    pago: 0,
    titulo: '',
    modoPago: '',
    pagoModo: {
      debito: false,
      credito: false,
      vale: false,
      transferencia: false,
      codi: false,
      efectivo: false
    },
    validate: false
  };

  constructor() { }

  restablecer() {
    this.copiar = false;
    this.contador = 0;
    this.departamentos = this.departamentos = [
      { tornilleria: false, departamento: 'tornilleria', totaltornilleria: 0 },
      { servicios: false, departamento: 'servicios', totalservicios: 0 },
      { refacciones: false, departamento: 'refacciones', totalrefacciones: 0 },
      { ferreteria: false, departamento: 'ferreteria', totalferreteria: 0 }
    ];
    this.valores = this.valores = {
      especial: false,
      folio: '',
      total: 0,
      abonado: [],
      Totalabonado: 0,
      paga: 0,
      resta: 0,
      debe: 0,
      cambio: 0,
      pago: 0,
      titulo: '',
      modoPago: '',
      pagoModo: {
        debito: false,
        credito: false,
        vale: false,
        transferencia: false,
        codi: false,
        efectivo: false
      },
      validate: false
    }
  }

  tornilleria(value: any): void {

    this.departamentos[0].tornilleria = true;
    if (this.departamentos[0].totaltornilleria) {
      this.departamentos[0].totaltornilleria = Number(this.departamentos[0].totaltornilleria) + Number(value);
      this.valores.total = Number(this.valores.total) + Number(value);
    } else {
      this.departamentos[0].totaltornilleria = Number(value);
      this.valores.total = Number(this.valores.total) + Number(value);
    }

   // //  console.log('ENTRO 1');
  }

  refacciones(value: any): void {
    this.departamentos[0].refacciones = true;
    if (this.departamentos[0].totalrefacciones) {
      this.departamentos[0].totalrefacciones = Number(this.departamentos[0].totalrefacciones) + Number(value);
      this.valores.total = Number(this.valores.total) + Number(value);
    } else {
      this.departamentos[0].totalrefacciones = Number(value);
      this.valores.total = Number(this.valores.total) + Number(value);
    }
   // //  console.log('ENTRO 2');

    //  //// //  console.log('refacciones');
    //  //// //  console.log(this.valores.total);
  }

  ferreteria(value: any): void {
    this.departamentos[0].ferreteria = true;
    if (this.departamentos[0].totalferreteria) {
      this.departamentos[0].totalferreteria = Number(this.departamentos[0].totalferreteria) + Number(value);
      this.valores.total = Number(this.valores.total) + Number(value);
    } else {
      this.departamentos[0].totalferreteria = Number(value);
      this.valores.total = Number(this.valores.total) + Number(value);
    }
   // //  console.log('ENTRO 3');

    //  //// //  console.log('ferreteria');
    //  //// //  console.log(this.valores.total);
  }

  servicios(value: any): void {
    this.departamentos[0].servicios = true;
    if (this.departamentos[0].totalservicios) {
      this.departamentos[0].totalservicios = Number(this.departamentos[0].totalservicios) + Number(value);
      this.valores.total = Number(this.valores.total) + Number(value);
    } else {
      this.departamentos[0].totalservicios = Number(value);
      this.valores.total = Number(this.valores.total) + Number(value);
    }
   // //  console.log('ENTRO 4');

    //  //// //  console.log('servicios');
    //  //// //  console.log(this.valores.total);
  }

  restablecerSpecial() {

    this.departamentos = this.departamentos = [
      { tornilleria: false, departamento: 'tornilleria', totaltornilleria: 0 },
      { servicios: false, departamento: 'servicios', totalservicios: 0 },
      { refacciones: false, departamento: 'refacciones', totalrefacciones: 0 },
      { ferreteria: false, departamento: 'ferreteria', totalferreteria: 0 }
    ];

    this.valores = this.valores = {
      especial: this.valores.especial,
      folio: '',
      total: 0,
      abonado: [],
      Totalabonado: 0,
      paga: 0,
      resta: 0,
      debe: 0,
      cambio: 0,
      pago: 0,
      titulo: this.valores.titulo,
      modoPago: this.valores.modoPago,
      pagoModo: {
        debito: this.valores.pagoModo.debito,
        credito: this.valores.pagoModo.debito,
        vale: this.valores.pagoModo.debito,
        transferencia: this.valores.pagoModo.debito,
        codi: this.valores.pagoModo.debito,
        efectivo: this.valores.pagoModo.debito
      },
      validate: this.valores.validate
    }
  }
}
