import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/index.service';
import { Registro } from '../../interface/registro';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  users: Array<Registro> = [];
  constructor(private FireStore: FirebaseService) { }

  ngOnInit(): void {
    this.FireStore.readUsers().subscribe((users) => {
      this.users = users;
    });
  }


  estatus(user: Registro) {
    user.estatus = !user.estatus;
    this.FireStore.updateUser(user).then(()=> {});
  }
}
