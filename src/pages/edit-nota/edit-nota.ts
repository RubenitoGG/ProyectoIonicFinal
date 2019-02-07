import { ViewNotaPage } from './../view-nota/view-nota';
import { Nota } from './../../models/nota/nota.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { NotasProvider } from '../../providers/notas/notas';
import { map } from 'rxjs/operators';

/**
 * Generated class for the EditNotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-nota',
  templateUrl: 'edit-nota.html',
})
export class EditNotaPage {

  key: any;

  listaNotas: Observable<Nota[]>;
  nota: Nota = {
    title: "",
    subtitle: "",
    content: "",
    type: null,
    userKey: "",
    key: this.key
  };
  numeroNotas: number;

  contenido: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public notas: NotasProvider) {
    this.key = navParams.data;

    // COGER TODAS LAS NOTAS:
    this.listaNotas = this.notas
      .getNotas()
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

    // BUSCAR NOTA ENTERA EN FIREBASE:
    this.buscarNota();
  }

  async buscarNota() {
    this.listaNotas.subscribe(notas => { this.numeroNotas = notas.length });
    await this.delay(50);
    for (let index = 0; index < this.numeroNotas; index++) {
      this.listaNotas.forEach(element => {
        if (this.key == element[index].key) {
          this.nota.key = element[index].key;
          this.nota.title = element[index].title;
          this.nota.subtitle = element[index].subtitle;
          this.nota.content = element[index].content;
          this.contenido = element[index].content;
          this.nota.type = element[index].type;
          this.nota.userKey = element[index].userKey;
        }

      });
    }
  }

  exit() {
    // ALERTA DE SALIR SIN GUARDAR:
    let alert = this.alertCtrl.create({
      title: 'Warning!',
      message: 'You are leaving without saving the changes!!!',
      buttons: [
        {
          text: 'Exit',
          handler: (blah) => {
            // SALIR:
            this.navCtrl.push(ViewNotaPage, this.nota.key);
          }
        }, {
          text: 'Cancel'
        }
      ]
    });

    alert.present();
  }

  save() {
    // GUARDAR 'CONTENT':
    this.nota.content = this.contenido;
    // ACTUALIZAR NOTA:
    this.notas.updateNotas(this.nota);
    // SALIR:
    this.navCtrl.push(ViewNotaPage, this.nota.key);
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
