import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfNotaPage } from './conf-nota';

@NgModule({
  declarations: [
    ConfNotaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfNotaPage),
  ],
})
export class ConfNotaPageModule {}
