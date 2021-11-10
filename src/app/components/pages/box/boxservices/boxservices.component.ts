import { Component, OnInit } from '@angular/core';
import { BoxService, MenuService, TicketService } from 'src/app/services/index.service';
@Component({
  selector: 'app-boxservices',
  templateUrl: './boxservices.component.html',
  styleUrls: ['./boxservices.component.css']
})
export class BoxservicesComponent implements OnInit {

  operacion: string = '';
  operadores: any;
  marcadores: any;

  constructor(private _box: BoxService, private _ticket: TicketService, private _menu: MenuService) {
    this.operadores = this._box.operadores;
    this.marcadores = this._box.marcadores;
  }
  ngOnInit(): void {
    //// //  console.log(this._menu.importe);
  }

  operaciones(value: any): void {
    switch (value) {
      case 'Abono':
        this._ticket.valores.especial = true;
        this.configuracionesModal('Modo Pago | Abonos | Finiquitos');
        break;
      case 'Reimprimir':
        break;
      case 'Ticket':
        this._ticket.valores.especial = false;
        this.configuracionesModal('Modo Pago | Pagos Contado');
        break;
      case 'Refacciones':
        this.departamento('refacciones');
        this.refacciones(this.operacion);
        break;
      case 'Tornillos':
        this._box.desabilitar('servicios');
        this.departamento('tornilleria');
        this.tornilleria(this.operacion);
        break;
      case 'Servicios':
        this._box.desabilitar('departamentos');
        this.departamento('servicios');
        this.servicios(this.operacion);
        break;
      case 'Ferreteria':
        this._box.desabilitar('servicios');
        this.departamento('ferreteria');
        this.ferreteria(this.operacion);
        break;
      case 'Delete':
        this.borrar();
        break;
      default:
        this.calculadora(value);
        break;
    }
  }

  borrar(): void {
    this.operacion = this.operacion.substring(0, this.operacion.length - 1);
  }

  tornilleria(value: any): void {
    this._ticket.tornilleria(value);
    this.operacion = '';
  }

  refacciones(value: any): void {
    this._ticket.refacciones(value);
    this.operacion = '';
  }

  ferreteria(value: any): void {
    this._ticket.ferreteria(value);
    this.operacion = '';
  }

  servicios(value: any): void {
    this._ticket.servicios(value);
    this.operacion = '';
  }

  configuracionesModal(value: string): void {
    this._ticket.valores.titulo = value;
  }

  calculadora(value: string): void {
    if (value === 'AC') {
      this.operacion = '';
      this._ticket.restablecer();
      this._box.habilitar('departamentos');
      this._box.habilitar('refacciones');
      this._box.habilitar('servicios');
      return;
    }

    // Primer caracter de la cadena
    if (this.operacion.length == 0) {
      if (this.operacion.charAt(0) == '') {
        if (value === '+' || value === '-' || value === '*' || value === '/' || value === '.' || value === '=' || value === 'AC') {
          this.operacion = '';
          return;
        } else {
          this.operacion = String(value);
          return;
        }
      }
    }

    if (value === '=') {
      this.operacion = String(eval(this.operacion));
      return;
    }

    // Ultimo caracter de la cadena
    const ultimo = this.operacion[this.operacion.length - 1];
    if (ultimo === '+' || ultimo === '-' || ultimo === '*' || ultimo === '/' || ultimo === '.' || ultimo === '=' || ultimo === 'AC') {
      if (value === '+' || value === '-' || value === '*' || value === '/' || value === '.' || value === '=' || value === 'AC') {
        return;
      }
    }

    // Agregar numero / operador
    if (this.operacion.length > 0) {
      this.operacion = this.operacion + value;
      return;
    }
  }

  departamento(departamento: string): void {
    if (departamento === 'tornilleria' || departamento === 'ferreteria' || departamento === 'servicios' || departamento === 'refacciones') {
      this._ticket.departamentos[0][departamento] = true;
    }
  }
}
