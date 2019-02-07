import { FriendNotaPage } from './../friend-nota/friend-nota';
import { map } from 'rxjs/operators';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { Usuario } from './../../models/usuario/usuario.interface';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  listaUsuarios: Observable<Usuario[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarios: UsuariosProvider) {
    // EXTRAER TODOS LOS USUARIOS:
    this.listaUsuarios = this.usuarios
      .getUsserList() // Devuelve la DB LIST.
      .snapshotChanges() // Valores.
      .pipe(map(changes => {
        return changes.map(
          c => ({
            key: c.payload.key,
            ...c.payload.val(),
          })
        )
      }
      ))
  }

  paramsPass ={
    key: "",
    username : ""
  }

  goFriend(usuario: Usuario){
    this.paramsPass.key = usuario.key;
    this.paramsPass.username = usuario.name;
    this.navCtrl.push(FriendNotaPage, this.paramsPass)
  }

}
