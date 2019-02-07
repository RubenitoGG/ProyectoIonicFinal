import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Nota } from '../../models/nota/nota.interface';

/*
  Generated class for the NotasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotasProvider {

  private refNotas = this.db.list<Nota>('notas');

  constructor(private db: AngularFireDatabase) {
  }

  addNote(nota: Nota) {
    return this.refNotas.push(nota);
  }

  getNotas() {
    return this.refNotas;
  }

  updateNotas(nota: Nota) {
    return this.refNotas.update(nota.key, nota);
  }

  deleteNota(nota: Nota){
    return this.refNotas.remove(nota.key);
  }
}
