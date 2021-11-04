import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { BoxService, FirebaseService, MenuService, ModoPagoService, OperacionesService, TicketService, NotificacionesService, LocalStorageService} from './index.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: [
    BoxService,
    FirebaseService,
    MenuService,
    ModoPagoService,
    OperacionesService,
    TicketService,
    NotificacionesService,
    LocalStorageService
  ]
})
export class ServicesModule { }
