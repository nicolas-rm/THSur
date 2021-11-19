import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { Registro } from '../interface/registro';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  user: Registro = {
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    estatus: true,
    fecha: '',
    especial: false
  };

  exist: boolean = false;
  constructor(private FireStore: FirebaseService, private router: Router) {

  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    const user = String(localStorage.getItem('email'));
    this.FireStore.readUser(user).subscribe((u) => {
      this.user = u[0];
      if (this.user.especial && !this.exist) {
        this.exist = true;
      }
      if (!this.user.especial && this.exist) {
        this.exist = false;
        this.router.navigate(['/principal']);
        // this.router.navigate([''])
      }
    });
    // console.log(this.exist);
    // console.log(this.user);
    return this.exist;
  }

}
