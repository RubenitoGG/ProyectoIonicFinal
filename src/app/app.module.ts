import { ViewFriendNotaPage } from './../pages/view-friend-nota/view-friend-nota';
import { FriendNotaPage } from './../pages/friend-nota/friend-nota';
import { ConfNotaPage } from './../pages/conf-nota/conf-nota';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MyApp } from './app.component';
import { RegistroPage } from '../pages/registro/registro';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { NotasPage } from '../pages/notas/notas';
import { FriendsPage } from '../pages/friends/friends';
import { NuevaNotaPage } from '../pages/nueva-nota/nueva-nota';
import { NotasProvider } from '../providers/notas/notas';
import { ViewNotaPage } from '../pages/view-nota/view-nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota';
import { ConfUserPage } from '../pages/conf-user/conf-user';

export const firebaseConfig = {
  apiKey: "AIzaSyCKqw4mrc6BNQcS4T6qgJmP4vJZv_Jiu3M",
    authDomain: "proyectoionic-3d1d0.firebaseapp.com",
    databaseURL: "https://proyectoionic-3d1d0.firebaseio.com",
    projectId: "proyectoionic-3d1d0",
    storageBucket: "proyectoionic-3d1d0.appspot.com",
    messagingSenderId: "835480014272"
};

@NgModule({
  declarations: [
    MyApp,
    RegistroPage,
    NotasPage,
    NuevaNotaPage,
    FriendsPage,
    ViewNotaPage,
    EditNotaPage,
    ConfNotaPage,
    ConfUserPage,
    FriendNotaPage,
    ViewFriendNotaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegistroPage,
    NotasPage,
    NuevaNotaPage,
    FriendsPage,
    ViewNotaPage,
    EditNotaPage,
    ConfNotaPage,
    ConfUserPage,
    FriendNotaPage,
    ViewFriendNotaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuariosProvider,
    NotasProvider
  ]
})
export class AppModule {}
