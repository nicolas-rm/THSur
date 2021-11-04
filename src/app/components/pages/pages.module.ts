import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BoxComponent } from './box/box.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { BoxservicesComponent } from './box/boxservices/boxservices.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { TicketComponent } from '../shared/ticket/ticket.component';
import { ServiciosComponent } from '../shared/servicios/servicios.component';
import { NotificacionesComponent } from '../shared/notificaciones/notificaciones.component';
import { SidebarMenuComponent } from '../shared/sidebar-menu/sidebar-menu.component';

import { PAGES_ROUTES } from './pages.routes';
import { TicketsComponent } from './tickets/tickets.component';

import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    BoxComponent,
    ModalComponent,
    MantenimientoComponent,
    EstadisticasComponent,
    TicketComponent,
    BoxservicesComponent,
    ServiciosComponent,
    NotificacionesComponent,
    TicketsComponent,
    SidebarMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PAGES_ROUTES,
    ChartsModule
  ]
})
export class PagesModule { }
