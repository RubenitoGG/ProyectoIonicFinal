import { ViewFriendNotaPage } from './../view-friend-nota/view-friend-nota';
import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { map, delay } from 'rxjs/operators';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Nota } from '../../models/nota/nota.interface';
import { NotasProvider } from '../../providers/notas/notas';
import { Usuario } from '../../models/usuario/usuario.interface';

/**
 * Generated class for the FriendNotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-nota',
  templateUrl: 'friend-nota.html',
})
export class FriendNotaPage {

  key: any;
  username: any;
  notas: Observable<Nota[]>;
  
  bool : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public notasPrv: NotasProvider) {
    this.key = this.navParams.data.key;
    this.username = this.navParams.data.username;
    this.bool = true;

    // RECOGEMOS TODAS LAS NOTAS:
    this.notas = this.notasPrv
      .getNotas()
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(
          c => ({
            key: c.payload.key,
            ...c.payload.val(),
          })
        )
      }))
  }

  viewNota(nota: Nota){
    this.navCtrl.push(ViewFriendNotaPage, nota);
  }
}
