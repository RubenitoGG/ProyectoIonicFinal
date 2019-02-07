import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewFriendNotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-friend-nota',
  templateUrl: 'view-friend-nota.html',
})
export class ViewFriendNotaPage {

  nota: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nota = navParams.data;
  }

}
