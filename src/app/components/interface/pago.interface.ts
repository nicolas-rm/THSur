export class TicketInterface {

  constructor(public especial: boolean, public folio: string, public total: number, public abonado: Array<number>, public Totalabonado: number, public paga: number, public resta: number, public debe: number, public cambio: number, public pago: number, public titulo: string, public modoPago: string, public pagoModo = { debito: false, credito: false, vale: false, transferencia: false, codi: false, efectivo: false }, public validate: boolean = false) {

  }
}
