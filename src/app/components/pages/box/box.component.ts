import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/index.service';
// import { OpcionsService } from 'src/app/services/navbarsSidebar.service';
import { LoginService } from '../../../services/login/login.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-services',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  disabled: boolean = false;
  opciones: any;
  importe: number = 0;
  exist: boolean = false;
  cajero: string = 'Hola como estan';
  constructor(private _menu: MenuService, private _login: LoginService, private _localStorage: LocalStorageService) {
    this.opciones = this._menu.menu;
    // this.cajero = `${this._login.usuario.nombre} ${this._login.usuario.apellidos}`;

    if (localStorage.getItem('uid') && localStorage.getItem('email') && localStorage.getItem('date') && localStorage.getItem('import') && localStorage.getItem('name')) {
      // this.inicio();
      this.cajero = String(localStorage.getItem('name'));
      this.importe = Number(localStorage.getItem('import'));
      if (this.importe == 0) {
        this.disabled = false;

      }
      if (this.importe > 0) {
        this.disabled = true;
      }
      this.exist = true;
      this._login.importe = this.importe;
    }
  }

  ngOnInit(): void {
    document.getElementById('aperturaBtn')?.click();
  }

  inicio() {
    document.getElementById('importBTN')?.click();
    this.exist = true;
    this._login.importe = this.importe;
    localStorage.setItem('import', String(this.importe));
  }

  limpiar() {
    this._localStorage.logOut();
  }

}
