import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Usuario } from './../../models/usuario/usuario.interface';

/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {

  private refUsuarios = this.db.list<Usuario>('usuarios')

  constructor(private db:AngularFireDatabase) {;
  }

  // SUBIR ITEM A LA BASE DE DATOS:
  addUsser(usuario: Usuario){
    return this.refUsuarios.push(usuario);
  }

  // RECOGER LISTA USUARIOS:
  getUsserList(){
    return this.refUsuarios;
  }

  // ACTUALIZAR USUARIO:
  updateNotas(usuario: Usuario) {
    return this.refUsuarios.update(usuario.key, usuario);
  }
}
