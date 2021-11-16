import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { map } from 'rxjs/operators';
import { Departamentos } from '../components/interface/departamentos';
import { NotificacionesService } from 'src/app/services/index.service';

import { Registro } from '../components/interface/registro';
import { hashSync, compareSync } from 'bcryptjs';
import { convertTimestamp } from 'convert-firebase-timestamp';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private documents!: AngularFirestoreCollection<Departamentos>;
  private document!: AngularFirestoreCollection<Departamentos>;
  private users!: AngularFirestoreCollection<Registro>;
  private user!: AngularFirestoreCollection<Registro>;


  /* Tornilleria, Ferreteria, Servicios, Refacciones */
  departamento!: Departamentos;
  update = {
    exist: false,
    folio: ''
  };
  /* Collection-  Abonos - Contado */
  collection: string = '';
  constructor(private FireStore: AngularFirestore, private _notificacion: NotificacionesService) { }


  /* CREA UN NUEVO DOCUMENTO DE DATOS - NUEVO REGISTRO */
  createCollection(document: Departamentos, especial: boolean) {

    this.selectCollection(especial);
    return this.FireStore.collection(this.collection).doc(document.folio).set(document).then((e) => {
      this.timerSuccess('Ticket Creado Correctamente.!');
      //// //  // // console.log(e);
    }).catch((error: FirebaseError) => {
      this.timerError('Ticket No Creado Correctamente.!');
      //// //  // // console.log(error);
    });
  }

  /* LEER DOCUMENTOS DE DATOS - OBTENER REGISTROS */
  readCollections(especial: boolean) {

    this.selectCollection(especial);
    this.documents = this.FireStore.collection<Departamentos>(this.collection);
    return this.documents.snapshotChanges().pipe(map((resp) => {
      const documents: Array<Departamentos> = [];
      resp.forEach((document) => {
        const doc = document.payload.doc.data();
        doc.fecha = convertTimestamp(document.payload.doc.data().fecha);
        documents.push(doc);
      });
      return documents;
    }));
  }

  abonos() {
    // this.selectCollection();
    this.collection = 'THSureste-Abonos'
    this.documents = this.FireStore.collection<Departamentos>(this.collection);
    return this.documents.snapshotChanges().pipe(map((resp) => {
      const documents: Array<Departamentos> = [];
      resp.forEach((document) => {
        const doc = document.payload.doc.data();
        doc.fecha = convertTimestamp(document.payload.doc.data().fecha);
        documents.push(doc);
      });
      return documents;
    }));
  }

  contado() {
    // this.selectCollection();
    this.collection = 'THSureste-Contado'
    this.documents = this.FireStore.collection<Departamentos>(this.collection);
    return this.documents.snapshotChanges().pipe(map((resp) => {
      const documents: Array<Departamentos> = [];
      resp.forEach((document) => {
        const doc = document.payload.doc.data();
        doc.fecha = convertTimestamp(document.payload.doc.data().fecha);
        documents.push(doc);
      });
      return documents;
    }));
  }

  /* LEER DOCUMENTO DE DATOS - OBTENER UN REGISTRO */
  readCollection(especial: boolean, folio: string) {

    this.selectCollection(especial);

    this.document = this.FireStore.collection<Departamentos>(this.collection);
    return this.document.doc(folio).snapshotChanges().pipe(map((resp) => {
      const document: Array<Departamentos> = [];
      if (resp.payload.exists && folio != this.update.folio) {
        const doc = resp.payload.data();
        doc.fecha = convertTimestamp(resp.payload.data().fecha);
        document.push(doc);
      }
      return document;
    }));;
  }

  /* ACTUALIZAR DOCUMENTO DE DATOS - MODIFICAR REGISTRO */
  updateCollection(document: Departamentos, especial: boolean) {

    this.selectCollection(especial);
    return this.FireStore.collection(this.collection).doc(document.folio).set(document);
  }

  deleteCollection(documentId: string, especial: boolean) {
    this.selectCollection(especial);
    return this.FireStore.collection(this.collection).doc(documentId).delete();
  }

  selectCollection(especial: boolean) {
    if (especial) {
      this.collection = 'THSureste-Abonos';
    } else {
      this.collection = 'THSureste-Contado';
    }
  }


  encrypt(document: Registro) {
    // document.correo = hashSync(document.correo, 10);
    document.contrasena = hashSync(document.contrasena, 10);
    // //  // // console.log(document);
    return document;
  }

  decrypt(document: Registro, user: Registro) {
    let equals = false;
    if (compareSync(document.contrasena, user.contrasena)) {
      equals = true;
      //// //  // // console.log(equals);

    }

    if (!compareSync(document.contrasena, user.contrasena)) {
      equals = false;
      //// //  // // console.log(equals);

    }

    //// //  // // console.log(equals);
    return equals;
  }


  createUser(document: Registro) {
    this.collection = 'THSureste-usuarios';
    return this.FireStore.collection<Registro>(this.collection).doc(document.correo).set(document).then(() => {
      //// //  // // console.log('Usuario Creado Correctamente.!');
    }).catch((error: FirebaseError) => {
      //// //  // // console.log(error);
      //// //  // // console.log('Usuario No Creado Correctamente.!');
    });
  }

  readUser(folio: string) {
    this.collection = 'THSureste-usuarios';
    this.user = this.FireStore.collection<Registro>(this.collection);
    return this.user.doc(folio).snapshotChanges().pipe(map((resp) => {
      //// //  // // console.log(resp);
      const document: Array<Registro> = [];
      if (resp.payload.exists) {
        document.push(resp.payload.data());
      }
      //// //  // // console.log(document);
      return document;
    }));;
  }


  /* LEER DOCUMENTOS DE DATOS - OBTENER REGISTROS */
  readUsers() {
    this.collection = 'THSureste-usuarios';
    this.users = this.FireStore.collection<Registro>(this.collection);
    return this.users.snapshotChanges().pipe(map((resp) => {
      const documents: Array<Registro> = [];
      resp.forEach((document) => {
        documents.push(document.payload.doc.data());
      });
      return documents;
    }));
  }


  search(collection: string, folio: string) {
    return this.FireStore.collection(collection).doc(folio).snapshotChanges().pipe(map((resp) => {
      if (resp.payload.exists) {
        return true;
      } else {
        return false;
      }
    }));
  }

  localstorage(user: Registro) {

  }


  updateUser(document: Registro) {
    this.collection = 'THSureste-usuarios';
    return this.FireStore.collection(this.collection).doc(document.correo).set(document);
  }
  timerSuccess(text: string) {
    this._notificacion.ngClass = '';
    this._notificacion.text = '';
    setTimeout(() => {
      this._notificacion.ngClass = 'show';
      this._notificacion.text = text;
      this._notificacion.accion = true;
    }, 1000);
    setTimeout(() => {
      this._notificacion.ngClass = '';
      this._notificacion.text = '';
      this._notificacion.accion = true;
    }, 9500);
  }

  timerError(text: string) {
    this._notificacion.ngClass = '';
    this._notificacion.text = '';
    setTimeout(() => {
      this._notificacion.ngClass = 'show';
      this._notificacion.text = text;
      this._notificacion.accion = false;

    }, 1000);
    setTimeout(() => {
      this._notificacion.ngClass = '';
      this._notificacion.text = '';
      this._notificacion.accion = false;
    }, 9500);
  }

  closeNotification() {
    this._notificacion.ngClass = '';
    this._notificacion.text = '';
  }


}
