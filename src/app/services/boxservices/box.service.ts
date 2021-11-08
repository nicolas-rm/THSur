import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  operadores: any = [
    { operador: '+', valor: '+', class: 'button-cal btn btn-lg btn-outline-dark btn-lg' },
    { operador: '-', valor: '-', class: 'button-cal btn btn-lg btn-outline-dark btn-lg' },
    { operador: '*', valor: '*', class: 'button-cal btn btn-lg btn-outline-dark btn-lg' },
    { operador: '/', valor: '/', class: 'button-cal btn btn-lg btn-outline-dark btn-lg' },
    { valor: 'Delete', class: 'button-cal btn b-tn-lg btn-outline-dark btn-lg', icon: 'fas fa-backspace', font: true }
  ];

  marcadores: any = [
    { accion: 7, valor: 7, class: 'button-cal btn btn-lg btn-dark waves-effect' },
    { accion: 8, valor: 8, class: 'button-cal btn btn-lg btn-dark waves-effect' },
    { accion: 9, valor: 9, class: 'button-cal btn btn-lg btn-dark waves-effect' },
    { accion: 'Ticket', valor: 'Ticket', class: 'button-cal btn btn-lg btn-warning waves-effect', modal: 'modal', target: '#ModalBox', id: 'ModalBox' },
    { accion: 'Servicios', valor: 'Servicios', class: 'button-cal btn btn-lg btn-primary servicios'},
    { accion: 4, valor: 4, class: 'button-cal btn btn-lg btn-dark waves-effect' },
    { accion: 5, valor: 5, class: 'button-cal btn btn-lg btn-dark waves-effect' },
    { accion: 6, valor: 6, class: 'button-cal btn btn-lg btn-dark waves-effect' },
    { accion: 'Abono', valor: 'Abono', class: 'button-cal btn btn-lg btn-warning waves-effect ', modal: 'modal', target: '#ModalBox', id: 'ModalBox' },
    { accion: 'Refaccion', valor: 'Refacciones', class: 'button-cal btn btn-lg btn-primary refacciones'},
    { accion: 1, valor: 1, class: 'button-cal btn btn-lg btn-dark waves-effect' },
    { accion: 2, valor: 2, class: 'button-cal btn btn-lg btn-dark waves-effect' },
    { accion: 3, valor: 3, class: 'button-cal btn btn-lg btn-dark waves-effect' },
    { accion: 'Re-Imp', valor: 'Reimprimir', class: 'button-cal btn btn-lg btn-warning waves-effect', modal: 'modal', target: '#ModalBox', id: 'ModalBox' },
    { accion: 'Ferreteria', valor: 'Ferreteria', class: 'button-cal btn btn-lg btn-primary departamentos'},
    { accion: 0, valor: 0, class: 'button-cal btn btn-lg btn-dark waves-effect btn-lg' },
    { accion: '.', valor: '.', class: 'button-cal btn btn-lg btn-secondary waves-effect' },
    { accion: 'AC', valor: 'AC', class: 'button-cal btn btn-lg btn-danger waves-effect ' },
    { accion: '=', valor: '=', class: 'button-cal btn btn-lg btn-success waves-effect' },
    { accion: 'Torn Gen', valor: 'Tornillos', class: 'button-cal btn btn-lg btn-primary departamentos'},

  ];

  mostrar = {
    total: '',
    paga: 'd-none',
    pago: 'd-none',
    resta: 'd-none',
    cambio: 'd-none',
  };
  constructor() { }


  desabilitar(name: string) {
    var departamentos = document.getElementsByClassName(name);
    for (var i = 0; i < departamentos.length; i++) {
      departamentos[i].classList.add("disabled");
    }
  }

  habilitar(name: string) {
    var departamentos = document.getElementsByClassName(name);
    for (var i = 0; i < departamentos.length; i++) {
      departamentos[i].classList.remove("disabled");
    }
  }
}
