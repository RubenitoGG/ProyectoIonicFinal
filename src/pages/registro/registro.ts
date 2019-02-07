import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, UrlSerializer } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { Usuario } from '../../models/usuario/usuario.interface';
import { Observable } from 'rxjs/Observable';
import { map, delay } from 'rxjs/operators';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  username: string;
  password: string;
  repeat: string;

  user: Usuario = {
    name: "",
    password: "",
    sentence: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public usuarios: UsuariosProvider) {
    this.username = "";
    this.password = "";
    this.repeat = "";

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

  async registrar() {
    //#region comprobacionTexto
    // COMPROBAR SI LOS CAMPOS ESTÁN CUBIERTOS:
    if (this.username.length == 0 || this.password.length == 0 || this.repeat.length == 0) {
      let alert = this.alertCtrl.create({
        title: 'Error:',
        subTitle: 'Need to cover all fields.',
        buttons: ['Dismiss']
      })

      alert.present();
    }
    // COMPROBAR SI LAS CONTRASEÑAS COINCIDEN:
    else if (this.password != this.repeat) {
      let alert = this.alertCtrl.create({
        title: 'Error:',
        subTitle: 'Passwords do not match.',
        buttons: ['Dismiss']
      })

      alert.present();
    }
    // COMPROBAR SI EL NOMBRE TIENE MÁS DE 3 LETRAS:
    else if (this.username.length < 3) {
      let alert = this.alertCtrl.create({
        title: 'Error:',
        subTitle: 'The name is too short.',
        buttons: ['Dismiss']
      })

      alert.present();
    }
    // COMPROBAR SI LA CONTRASEÑA TIENE MÁS DE 3 LETRAS:
    else if (this.password.length < 3) {
      let alert = this.alertCtrl.create({
        title: 'Error:',
        subTitle: 'The pass is too short.',
        buttons: ['Dismiss']
      })

      alert.present();
    }
    //#endregion
    else {
      this.user.name = this.username;
      this.user.password = this.password;
      // COMPROBAR SI EL USUARIO ESTÁ EN FIREBASE:
      this.correcto = true;
      this.checkUsser()
      await this.delay(1);

      if (this.correcto) {
        // AÑADIR USUARIO:
        this.usuarios.addUsser(this.user);

        // MENSAJE DE USUARIO REGISTRADO Y CAMBIO DE PANTALLA:
        let alert = this.alertCtrl.create({
          title: 'Welcome!',
          subTitle: 'Usser added successfully.',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.setRoot(HomePage);
            }
          }]
        })

        alert.present();
      } else {
        // MENSAJE DE NOMBRE YA EN USO:
        let alert = this.alertCtrl.create({
          title: 'Error:',
          subTitle: 'Ussername is alredy used.',
          buttons: ['Dismiss']
        })

        alert.present();
      }
    }
  }

  listaUsuarios: Observable<Usuario[]>;
  numeroUsuarios: number;
  correcto: boolean;

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  checkUsser() {
    this.listaUsuarios.subscribe(usuarios => { this.numeroUsuarios = usuarios.length });
    for (let index = 0; index < this.numeroUsuarios; index++) {
      this.listaUsuarios.forEach(element => { // todos los usuarios.
        if (this.username == element[index].name)
          this.correcto = false;
      });
    }
  }
}
