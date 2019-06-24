import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private afDB:AngularFirestore) { 

  }
  crearIngresoEgreso(ingresoEgreso:IngresoEgreso){
    
  }
}
