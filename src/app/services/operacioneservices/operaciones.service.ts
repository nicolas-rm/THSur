import { Injectable } from '@angular/core';
import { TicketInterface } from 'src/app/components/interface/pago.interface';

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  constructor() { }

  operaciones(valores: TicketInterface) {
    if (valores.especial) {
      if (valores.total == valores.Totalabonado) {
        valores.resta = valores.total - valores.Totalabonado;
      }
      if (valores.total == null || valores.total < valores.Totalabonado) {
        valores.paga = 0;
        valores.pago = 0;
        valores.resta = 0;
        valores.debe = 0;
        valores.cambio = 0;
      }
      if (valores.total > valores.Totalabonado) {
        valores.resta = valores.total - valores.Totalabonado;
      }
      if (valores.paga > 0 && valores.paga > valores.resta) {
        valores.paga = valores.resta;
      }
      if (valores.pago >= valores.paga) {
        valores.cambio = valores.pago - valores.paga;
      }

      if (valores.paga > 0) {
        if (valores.Totalabonado == valores.paga) {
          valores.debe = 0;
        }
        if (valores.paga == null && valores.total == null) {
          valores.debe = 0;
        } else {
          valores.debe = valores.total - (valores.Totalabonado + valores.paga)
        }
      }

      if (valores.total == valores.Totalabonado) {
        valores.paga = valores.total;
        if (valores.pago > valores.paga) {
          valores.cambio = valores.pago - valores.paga;
        }
      }



      if (valores.paga == null) {
        valores.debe = 0;
      }
      if (valores.pago == null) {
        valores.debe = 0;
      }
     //  // console.log('OPERACIONES');
     //  // console.log(valores.total);
    }


    if (!valores.especial) {
      if (valores.total == null || valores.total < 0) {
        valores.paga = 0;
        valores.pago = 0;
        valores.resta = 0;
        valores.debe = 0;
        valores.cambio = 0;
      }
      if (valores.pago > valores.total) {
        valores.cambio = valores.pago - valores.total;
      } else {
        valores.cambio = 0;
      }
    }
    // ////  // console.log(valores);
    return this.validaciones(valores);
  }

  validaciones(valores: TicketInterface) {
    if (valores.especial) {
      if (valores.modoPago == 'efectivo') {
        if (String(valores.folio).length > 3 && valores.total > 0 && valores.paga > 0 && valores.pago >= valores.paga && valores.folio != null && valores.folio != '' && valores.folio != '\n' && valores.folio != '\s' && valores.folio != '\t') {
          valores.validate = true;
        } else {
          valores.validate = false;
        }
      } else if (String(valores.folio).length > 3 && valores.paga > 0 && valores.total > 0 && valores.folio != null && valores.folio != '' && valores.folio != '\n' && valores.folio != '\s' && valores.folio != '\t') {
        valores.validate = true;
      } else {
        valores.validate = false;
      }
    }
    if (!valores.especial) {
      if (valores.modoPago == 'efectivo') {
        if (String(valores.folio).length > 3 && valores.total > 0 && valores.pago >= valores.total && valores.folio != null && valores.folio != '' && valores.folio != '\n' && valores.folio != '\s' && valores.folio != '\t') {
          valores.validate = true;
        } else {
          valores.validate = false;
        }
      } else if (String(valores.folio).length > 3 && valores.total > 0 && valores.folio != null && valores.folio != '' && valores.folio != '\n' && valores.folio != '\s' && valores.folio != '\t') {
        valores.validate = true;
      } else {
        valores.validate = false;
      }
    }

    return valores;
  }
}
