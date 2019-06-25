import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from "./ingreso-egreso.model";

export interface IngresoEgresoState {
    items:IngresoEgreso[]
}

const estadoInicial:IngresoEgresoState = { 
    items:[]
}

export function ingresoEgresoReducer ( state= estadoInicial,action:fromIngresoEgreso.acciones){

}