import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Note } from 'ionic-angular';
import { NotasProvider } from '../../providers/notas/notas';
import { Nota } from '../../models/nota/nota.interface';
import { ViewNotaPage } from '../view-nota/view-nota';
import { NotasPage } from '../notas/notas';

/**
 * Generated class for the NuevaNotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nueva-nota',
  templateUrl: 'nueva-nota.html',
})
export class NuevaNotaPage {

  key: any;
  title: string;
  subtitle: string;
  type: boolean;

  nota: Nota = {
    userKey: "",
    title: "",
    subtitle: "",
    type: null,
    content: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public notas: NotasProvider) {
    this.key = navParams.data.key;
    this.title = "";
    this.subtitle = "";
  }

  create() {
    // COMPROBAR SI LOS CAMPOS ESTÁN CUBIERTOS:
    if (this.title.length == 0 || this.subtitle.length == 0 || this.type == null) {
      let alert = this.alertCtrl.create({
        title: 'Error:',
        subTitle: 'Need to cover all fields.',
        buttons: ['Dismiss']
      })

      alert.present();
    } else {
      // GUARDAR LOS VALORES DE LA NOTA:
      this.nota.userKey = this.key;
      this.nota.title = this.title;
      this.nota.subtitle = this.subtitle;
      this.nota.type = this.type;

      // AÑADIR NOTA A LA BASE DE DATOS:
      this.notas.addNote(this.nota);

      // MENSAJE DE NOTA AÑADIDA:
      let alert = this.alertCtrl.create({
        title: 'Great!',
        subTitle: 'Note added successfully.',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.navCtrl.push(NotasPage, this.nota.userKey);
          }
        }]
      })

      alert.present();
    }
  }
}
