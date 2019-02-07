import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfUserPage } from './conf-user';

@NgModule({
  declarations: [
    ConfUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfUserPage),
  ],
})
export class ConfUserPageModule {}
