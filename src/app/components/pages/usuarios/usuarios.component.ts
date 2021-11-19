import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { Registro } from '../../interface/registro';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  users: Array<Registro> = [];
  constructor(private FireStore: FirebaseService) { }

  usuario: string = '';

  ngOnInit(): void {
    this.FireStore.readUsers().subscribe((users) => {
      this.users = users;
    });
  }

  search(usuario: string) {

    if (usuario == ' ' || usuario == '\r' || usuario == '\t' || usuario == '\s' || usuario == '\n' || usuario == null) {
      this.ngOnInit();
    }
    if (usuario.length < 3) {
      return;
    }

    this.FireStore.readUser(usuario).subscribe((e) => {
      this.users = [];
      this.users = e;
    });
  }

  estatus(user: Registro) {
    user.estatus = !user.estatus;
    this.FireStore.updateUser(user).then(() => { });
  }

  especial(user: Registro) {
    user.especial = !user.especial;
    this.FireStore.updateUser(user).then(() => { });
  }

  delete(usuario: Registro) {
    SWAL_CONFIRMATION('Al Usuario', usuario.nombre).then((eliminar) => {
      if (eliminar) {
        this.FireStore.deleteUser(usuario).then(() => {
          SWAL_DELETE('Usuario', `${usuario.nombre} ${usuario.apellidos}`);
        });
      }
    });
  }
}
export const SWAL_CONFIRMATION = (preposicion: string, parametro: string) => {
  // let confirmacion: boolean = false;

  return Swal.fire({
    title: '¿Estas Seguro?',
    text: `Desea Eliminar ${preposicion} ${parametro}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, Eliminar'
  }).then((result) => {
    if (result.value) {
      return true;
    } else {
      return false;
    }
  });

  // return confirmacion;
};

export const SWAL_DELETE = (tipo: string, parametro?: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: 'success',
    title: `${tipo}!`,
    text: parametro + ' Eliminado Correctamente.'
  });
};
