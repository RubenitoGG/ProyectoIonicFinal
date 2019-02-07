import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditNotaPage } from './edit-nota';

@NgModule({
  declarations: [
    EditNotaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditNotaPage),
  ],
})
export class EditNotaPageModule {}
