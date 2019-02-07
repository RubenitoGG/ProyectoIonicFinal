import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { Usuario } from '../../models/usuario/usuario.interface';
import { map, delay } from 'rxjs/operators';
import { text } from '@angular/core/src/render3/instructions';
import { HomePage } from '../home/home';

/**
 * Generated class for the ConfUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conf-user',
  templateUrl: 'conf-user.html',
})
export class ConfUserPage {

  key: any;
  username: string;
  content: string;

  listaUsuarios: Observable<Usuario[]>;
  numeroUsuarios: number;

  usuario: Usuario = {
    name: "",
    password: "",
    sentence: "",
    key: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarios: UsuariosProvider, public alertCtrl: AlertController) {
    this.username = "Pepe";
    this.content = "contenido";

    this.key = this.navParams.data;

    // EXTRAER LOS DATOS:
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

    this.checkUsser();
  }

  async checkUsser() {
    this.listaUsuarios.subscribe(usuarios => { this.numeroUsuarios = usuarios.length });
    await this.delay(50);
    for (let index = 0; index < this.numeroUsuarios; index++) {
      this.listaUsuarios.forEach(element => { // todos los usuarios.
        if (this.key == element[index].key) {
          this.username = element[index].name;
          this.content = element[index].sentence;
          this.usuario.key = element[index].key;
          this.usuario.name = element[index].name;
          this.usuario.password = element[index].password;
          this.usuario.sentence = element[index].sentence;
        }

      });
    }
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async editInformation() {
    // CREAR ALERTA PARA CAMBIAR LA FRASE:
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'sentence',
          placeholder: 'Sentence'
        }
      ],
      buttons: [
        { //CANCELAR:
          text: 'Cancel'
        }, {
          text: 'Save',
          handler: data => {
            if (data.sentence.length > 40) {
              let alert = this.alertCtrl.create({
                title: 'Error:',
                subTitle: 'The sentence is too long.',
                buttons: ['Dismiss']
              })
              alert.present();
              return;
            }
            // GUARDAR FRASE:
            this.content = data.sentence;
            this.usuario.sentence = "\"" + data.sentence + "\"";
            this.usuarios.updateNotas(this.usuario);
          }
        }
      ]
    })

    await alert.present();
  }

  exit() {
    this.navCtrl.popToRoot();
  }

  async changePass() {
    // CREAR ALERTA PARA CAMBIAR LA CONTRASEÑA:
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'pass',
          placeholder: 'Password'
        }, {
          name: 'repeatPass',
          placeholder: 'Repeat password'
        }
      ],
      buttons: [
        { //CANCELAR:
          text: 'Cancel'
        }, {
          text: 'Save',
          handler: data => {
            // SI SON IGUALES GUARDAR:
            if (data.pass == data.repeatPass) {
              this.usuario.password = data.pass;
              this.usuarios.updateNotas(this.usuario);
              let alert = this.alertCtrl.create({
                title: 'Success:',
                subTitle: 'Password changed!',
                buttons: ['Ok']
              })
              alert.present();
            } else {  // SI NO CANCELAR:
              let alert = this.alertCtrl.create({
                title: 'Error:',
                subTitle: 'Passwords do not match.',
                buttons: ['Dismiss']
              })
              alert.present();
            }
          }
        }
      ]
    })

    await alert.present();
  }

}
