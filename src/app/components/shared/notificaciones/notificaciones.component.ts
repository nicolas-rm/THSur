import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/services/index.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  constructor(public _notificaciones: NotificacionesService) {

  }

  ngOnInit(): void {
  }

}
