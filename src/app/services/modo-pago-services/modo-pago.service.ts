import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModoPagoService {

  modoPagos: any = [
    [
      { tipo: 'Debito', name: 'debito', id: 'debito', check: false },
      { tipo: 'Credito', name: 'credito', id: 'credito', check: false },
    ],
    [
      { tipo: 'Vales', name: 'vales', id: 'vales', check: false },
      { tipo: 'Transferencia', name: 'transferencia', id: 'transferencia', check: false },
    ],
    [
      { tipo: 'Efectivo', name: 'efectivo', id: 'efectivo', check: false },
      { tipo: 'CODI', name: 'codi', id: 'codi', check: false }
    ]
  ];
  constructor() { }

  restablecer() {
    this.modoPagos = this.modoPagos = [
      [
        { tipo: 'Debito', name: 'debito', id: 'debito', check: false },
        { tipo: 'Credito', name: 'credito', id: 'credito', check: false },
      ],
      [
        { tipo: 'Vales', name: 'vales', id: 'vales', check: false },
        { tipo: 'Transferencia', name: 'transferencia', id: 'transferencia', check: false },
      ],
      [
        { tipo: 'Efectivo', name: 'efectivo', id: 'efectivo', check: false },
        { tipo: 'CODI', name: 'codi', id: 'codi', check: false }
      ]
    ];
  }
}
