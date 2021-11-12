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

    if (localStorage.getItem('uid') && localStorage.getItem('email') && localStorage.getItem('date') && localStorage.getItem('name')) {
      // this.inicio();
      this.cajero = String(localStorage.getItem('name'));
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('import')) {
      this.exist = true;
    } else {
      document.getElementById('aperturaBtn')?.click();
    }
  }

  inicio() {
    if (this.importe <= 0) {
      return;
    } else {
      localStorage.setItem('import', String(this.importe));
      this.exist = true;
      document.getElementById('importBTN')?.click();
    }
  }

  limpiar() {
    this._localStorage.logOut();
  }
  clean() {
    var btn: any = document.getElementById('importeInicio');
    btn.value = '';
  }
}
