import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaNotaPage } from './nueva-nota';

@NgModule({
  declarations: [
    NuevaNotaPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevaNotaPage),
  ],
})
export class NuevaNotaPageModule {}
