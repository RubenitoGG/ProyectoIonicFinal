import { ViewNotaPage } from './../view-nota/view-nota';
import { map } from 'rxjs/operators';
import { NotasProvider } from './../../providers/notas/notas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Nota } from '../../models/nota/nota.interface';
import { NotasPage } from '../notas/notas';

/**
 * Generated class for the ConfNotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conf-nota',
  templateUrl: 'conf-nota.html',
})
export class ConfNotaPage {

  title: string;
  subtitle: string;
  type: boolean;

  key: any;
  listaNotas: Observable<Nota[]>;
  numeroNotas: number;

  nota: Nota = {
    title: "",
    subtitle: "",
    content: "",
    type: null,
    userKey: "",
    key: this.key
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public notas: NotasProvider, public alertCtrl:AlertController) {
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
          this.title = element[index].title;
          this.subtitle = element[index].subtitle;
          this.type = element[index].type;
          // Nota:
          this.nota.key = element[index].key;
          this.nota.title = element[index].title;
          this.nota.subtitle = element[index].subtitle;
          this.nota.content = element[index].content;
          this.nota.type = element[index].type;
          this.nota.userKey = element[index].userKey;
        }

      });
    }
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  saveNote() {
    this.nota.title = this.title;
    this.nota.subtitle = this.subtitle;
    this.nota.type = this.type;
    // GUARDAR CAMBIO:
    this.notas.updateNotas(this.nota);
    this.navCtrl.push(ViewNotaPage, this.nota.key);
  }
}
