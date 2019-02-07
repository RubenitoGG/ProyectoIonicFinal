import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Note } from 'ionic-angular';
import { NuevaNotaPage } from '../nueva-nota/nueva-nota';
import { Observable } from 'rxjs';
import { Nota } from '../../models/nota/nota.interface';
import { NotasProvider } from '../../providers/notas/notas';
import { map } from 'rxjs/operators';
import { ViewNotaPage } from '../view-nota/view-nota';
import { ConfUserPage } from '../conf-user/conf-user';
import { FriendsPage } from '../friends/friends';

/**
 * Generated class for the NotasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html',
})
export class NotasPage {

  key: any;
  paramsPass = {
    key: this.key
  };

  notas: Observable<Nota[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public notasPrv: NotasProvider) {
    // Recibir la clave del usuario:
    this.key = navParams.data;

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

  newNote() {
    this.paramsPass.key = this.key;
    this.navCtrl.push(NuevaNotaPage, this.paramsPass);
  }

  editNote(nota: Nota) {
    this.navCtrl.push(ViewNotaPage, nota.key);
  }

  editUser() {
    this.navCtrl.push(ConfUserPage, this.key);
  }

  goFriends() {
    this.navCtrl.push(FriendsPage);
  }
}
