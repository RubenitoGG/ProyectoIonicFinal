import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendNotaPage } from './friend-nota';

@NgModule({
  declarations: [
    FriendNotaPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendNotaPage),
  ],
})
export class FriendNotaPageModule {}
