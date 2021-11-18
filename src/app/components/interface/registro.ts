export interface Registro {
  nombre: string;
  apellidos: string;
  correo: string;
  contrasena: string;
  estatus: boolean;
  uid?: string;
  fecha: string | Date;
}
