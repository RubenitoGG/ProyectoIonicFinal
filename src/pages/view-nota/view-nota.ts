import { ConfNotaPage } from './../conf-nota/conf-nota';
import { EditNotaPage } from './../edit-nota/edit-nota';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotasPage } from '../notas/notas';
import { Observable } from 'rxjs';
import { Nota } from '../../models/nota/nota.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { NotasProvider } from '../../providers/notas/notas';
import { map } from 'rxjs/operators';

/**
 * Generated class for the ViewNotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-nota',
  templateUrl: 'view-nota.html',
})
export class ViewNotaPage {

  key: any;

  titulo: string;
  subtitulo: string;
  contenido: string;
  numeroNotas: number;
  userKey: string;

  listaNotas: Observable<Nota[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase, public notas: NotasProvider) {
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
    // BUSCAR NOTA POR LA CLAVE:
    this.buscarNota();
  }

  async buscarNota() {
    this.listaNotas.subscribe(notas => { this.numeroNotas = notas.length });
    await this.delay(50);
    for (let index = 0; index < this.numeroNotas; index++) {
      this.listaNotas.forEach(element => {
        if (this.key == element[index].key) {
          this.titulo = element[index].title;
          this.subtitulo = element[index].subtitle;
          this.contenido = element[index].content;
          this.userKey = element[index].userKey;
        }
      });
    }
  }

  confNote(){
    this.navCtrl.push(ConfNotaPage, this.key);
  }

  editNote(){
    this.navCtrl.push(EditNotaPage, this.key);
  }

  backMenu() {
    // VOLVER A LA LISTA DE NOTAS:
    this.navCtrl.push(NotasPage, this.userKey);
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
