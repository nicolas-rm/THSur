import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app/firebase';
import { Router } from '@angular/router';
import { TicketService, ModoPagoService, BoxService } from 'src/app/services/index.service';
import { FirebaseService } from '../../../services/firebase.service';
import { Departamentos } from '../../interface/departamentos';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit, OnDestroy {
  // @HostListener('window:afterprint')
  cajero: string = ''
  @Input() bankName: string = '';
  // date: any = new Date();
  exist = false;
  condicion = true;
  abonosArray: Array<any> = [];
  constructor(public _ticket: TicketService, private _modopago: ModoPagoService, private _box: BoxService, private _FireStore: FirebaseService, private router: Router) {
    for (let key in this._ticket.valores.abonado) {
      this.abonosArray.push({ abono: this._ticket.valores.abonado[key] });
    }
    this.condicion = true;

  }
  ngOnDestroy(): void {
    this.condicion = true;

    // // // console.log('ngOnDestroy');
  }

  ngOnInit(): void {
    this.condicion = true;

    this.cajero = String(localStorage.getItem('name'));
  }

  prinit() {
    const finish = this.saveCollection();
    const onbeforeprint = () => {
      //  //// //  // // // console.log('Impresion en proceso!.');
      finish;
      return true;
    };

    const onafterprint = () => {
      finish;
      return true;
    };

    if (window.matchMedia) {
      var mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener((mql) => {
        if (mql.matches) {
          onbeforeprint();
        } else {
          onafterprint();
        }
      });
    }
    window.print();
    window.onbeforeprint = onbeforeprint;
    window.onafterprint = onafterprint;
  }

  restablecer() {
    this._box.mostrar = {
      total: '',
      paga: 'd-none',
      pago: 'd-none',
      resta: 'd-none',
      cambio: 'd-none',
    };
    this.exist = false;
    this._FireStore.update.folio = ''
    this._ticket.reimprimir = false;
    this._FireStore.update.exist = false;
    this._modopago.restablecer();
    this._ticket.restablecer();
    this._box.habilitar('departamentos');
    this._box.habilitar('servicios');
  }

  saveCollection() {
    const collection: Departamentos = {
      especial: this._ticket.valores.especial,
      modoPago: this._ticket.valores.modoPago,
      cajero: String(localStorage.getItem('name')),
      departamento: this.departamentos(),
      total: this._ticket.valores.total,
      totales: this.importes(),
      abonos: this._ticket.valores.abonado,
      resta: this._ticket.valores.resta,
      fecha: new Date(),
      folio: (this._ticket.valores.folio.length > 3) ? this._ticket.valores.folio : 'null',
      pago: this._ticket.valores.pago,
      paga: this._ticket.valores.paga,
      cambio: this._ticket.valores.cambio,
      totalAbonado: this._ticket.valores.Totalabonado
    };

    this.readCollection(collection);
    // // console.log(this._ticket.valores.especial);
    // this.restablecer();
    // document.getElementById('ticketClose')?.click();

  }

  departamentos() {
    const departamentos: Array<string> = [];
    if (this._ticket.departamentos[0].ferreteria) {
      departamentos.push('Ferreteria');
    }
    if (this._ticket.departamentos[0].refacciones) {
      departamentos.push('Refacciones');
    }
    if (this._ticket.departamentos[0].servicios) {
      departamentos.push('Servicios');
    }
    if (this._ticket.departamentos[0].tornilleria) {
      departamentos.push('Tornilleria');
    }
    return departamentos;

  }

  importes() {
    const importes: Array<number> = [];
    if (this._ticket.departamentos[0].totalferreteria) {
      importes.push(this._ticket.departamentos[0].totalferreteria);
    }
    if (this._ticket.departamentos[0].totalrefacciones) {
      importes.push(this._ticket.departamentos[0].totalrefacciones);
    }
    if (this._ticket.departamentos[0].totalservicios) {
      importes.push(this._ticket.departamentos[0].totalservicios);
    }
    if (this._ticket.departamentos[0].totaltornilleria) {
      importes.push(this._ticket.departamentos[0].totaltornilleria);
    }
    return importes;
  }



  createCollection(collection: Departamentos) {
    this._FireStore.createCollection(collection, this._ticket.valores.especial).then(() => {
      this.restablecer();
      document.getElementById('ticketClose')?.click();
      this._FireStore.timerSuccess('Ticket Creado Correctamente.!');
    }).catch(() => {
      this.restablecer();
      document.getElementById('ticketClose')?.click();
      this._FireStore.timerError('Ticket No Fue Creado.!');
    });
  }

  updateCollection(collection: Departamentos) {
    this._FireStore.updateCollection(collection, this._ticket.valores.especial).then(() => {
      this.restablecer();
      document.getElementById('ticketClose')?.click();
      this._FireStore.timerSuccess('Ticket Actualizado Correctamente.!');
    }).catch((error: FirebaseError) => {
      this.restablecer();
      document.getElementById('ticketClose')?.click();
      this.restablecer();
      this._FireStore.timerError('Ticket No Actualizado correctamente.!');
    });
  }

  readCollection(collection: Departamentos) {
    this.condicion = true;
    if (collection.especial) {
      this._FireStore.readCollection(this._ticket.valores.especial, this._ticket.valores.folio).subscribe((documento: Departamentos[]) => {
        if (documento.length > 0 && !this.exist && this.condicion) {

          if (collection.especial) {
            if (collection.folio == this._FireStore.update.folio && this.condicion) {
              this.updateCollection(collection);
              this.condicion = false;
              return;
            }
            if (collection.especial && collection.folio != this._FireStore.update.folio && this.condicion) {
              this.condicion = false;

              document.getElementById('ticketClose')?.click();
              this._FireStore.timerError('Folio Ya Existe.!');
              this.restablecer();
              return;
            }
          }

          // if (collection.especial && collection.folio == documento[0].folio && this.condicion) {
          //   this.condicion = false;
          //   document.getElementById('ticketClose')?.click();
          //   this._FireStore.timerError('Folio Ya Existe.!');
          //   this.restablecer();
          //   return;
          // }
        }


        if (documento.length == 0 && !this.exist && this.condicion) {
          if (collection.especial && this.condicion) {
            this.condicion = false;
            this.createCollection(collection);
            return;
          }

          if (!collection.especial && this.condicion) {
            this.condicion = false;
            this.createCollection(collection);
            return;
            // this._FireStore.('Folio Ya Existe.!');
          }
          this.exist = true;
          this.condicion = false;
        }
      });

      return;
    }
    if (!collection.especial) {
      this.createCollection(collection);
    }
    //(this.exist);
  }

  reimprimir() {
    window.print();
  }
}
