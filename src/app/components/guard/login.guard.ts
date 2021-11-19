import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService, LocalStorageService } from 'src/app/services/index.service';
import { Registro } from '../interface/registro';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  exist: boolean = false;
  constructor(private _FireStore: FirebaseService, private _localStorage: LocalStorageService, private _router: Router) {

  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    // //  // // // console.log('Paso Por El Login Guard');

    if (localStorage.getItem('uid') && localStorage.getItem('email') && localStorage.getItem('date')) {
      const tokenDate = new Date(String(localStorage.getItem('date'))).toLocaleString().split(' ')[0];
      const date = new Date().toLocaleString().split(' ')[0];
      // // console.log(tokenDate);
      // // console.log(date);
      if (tokenDate != date) {
        this._localStorage.logOut();
        // //  // // // console.log('OK : 504');
        this._router.navigate(['/inicio']);
      }

      this._FireStore.readUser(String(localStorage.getItem('email'))).subscribe((resp) => {
        if (resp.length > 0 && !this.exist) {
          if (this._localStorage.verify(String(resp[0].uid))) {
            localStorage.removeItem('uid')
            localStorage.setItem('uid', String(resp[0].uid))
            this.exist = true;
            // console.log('OK : 200');
            this._router.navigate(['/principal']);
          } else {
            this._router.navigate(['/inicio']);
          }
        }

        if (resp.length == 0 && !this.exist) {
          // //  // // // console.log('OK : 500');
          this._router.navigate(['/inicio']);
        }
      });
    } else {
      // //  // // // console.log('OK : 404');
      // this._localStorage.logOut();
      this._router.navigate(['/inicio']);
    }
    return this.exist;
  }
}
