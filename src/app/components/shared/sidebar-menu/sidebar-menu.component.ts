import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, LOCALE_ID } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { convertTimestamp } from 'convert-firebase-timestamp';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  cajero: string = '';
  date: string = '';
  @Input() bankName: string = '';

  constructor(public _login: LoginService, private _localstorage: LocalStorageService) {
    if (localStorage.getItem('uid') && localStorage.getItem('email') && localStorage.getItem('date') && localStorage.getItem('import') && localStorage.getItem('name')) {
      this.cajero = String(localStorage.getItem('name'));
      this.date = String(localStorage.getItem('date'));

      // console.log(new Date(this.date).toLocaleString().split(' '));
      // console.log(new Date().toLocaleString().split(' '));
      // console.log(new DatePipe(LOCALE_ID.toString()).transform(this.date, 'dd/MM/yy'));
      // if (new DatePipe('').transform('medium')) {

      // }
    }
  }

  ngOnInit(): void {
  }

  cerrar() {
    this._localstorage.logOut();
  }

}
