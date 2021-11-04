import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Departamentos } from '../../interface/departamentos';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  collectiones!: Array<Departamentos>;
  constructor(private _FireStore: FirebaseService) { }

  ngOnInit(): void {
    this._FireStore.readCollections(true).subscribe((collectiones: Departamentos[]) => {
      if (collectiones.length > 0) {
        this.collectiones = collectiones;
      }
    });
    this._FireStore.readCollections(false).subscribe((collectiones: Departamentos[]) => {
      if (collectiones.length > 0) {
        this.collectiones = collectiones;
      }
    });
    // this.collectiones = this._FireStore.readCollections(true);
  }


}
