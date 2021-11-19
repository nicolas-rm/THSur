
/**
 * CREACION DE ROUTES
 * SECCION DE PAGINAS
 */

import { RouterModule, Routes } from '@angular/router';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
// import { IngresoComponent } from './ingreso/ingreso.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { BoxservicesComponent } from './box/boxservices/boxservices.component';
import { BoxComponent } from './box/box.component';
import { TicketComponent } from '../shared/ticket/ticket.component';
import { NotificacionesComponent } from '../shared/notificaciones/notificaciones.component';
import { LoginGuard } from '../guard/login.guard';
import { TicketsComponent } from './tickets/tickets.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminGuard } from '../guard/admin.guard';

/* ===================================================== */
/* ==================>> COMPONENTES <<================== */


/* ==================>> COMPONENTES <<================== */
/* ===================================================== */

const routes: Routes = [
  /* RUTAS SECUNDARIAS */
  /* ESTRUCTURA DE UNA RUTA: */

  /**
   * PATH: NOMBRE DE LA RUTA
   * COMPONENT: COMPONENTE AL CUAL HACE REFERENCIA
   * DATA(OPCIONAL): COSAS EXTRAS, TITULO, DESCRIPCION
   * ENTRE OTRAS....
   *
   */
  {
    path: '',
    component: BoxComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'principal',
        component: BoxservicesComponent,
        canActivate: [LoginGuard],

      },
      {
        path: 'tickets',
        component: TicketsComponent,
        canActivate: [LoginGuard],

      },
      {
        path: 'estadisticas',
        component: EstadisticasComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AdminGuard],
      },
      // /* REDIRECCION */
      { path: '', redirectTo: '/principal', pathMatch: 'full' },
    ],
  },
];

/**
 * forChild: PARA RUTAS SECUNDARIAS
 */
export const PAGES_ROUTES = RouterModule.forChild(routes);
