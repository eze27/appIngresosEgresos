import { Action } from "@ngrx/store";


//definir acciones
export const ACTIVAR_LOADING = '[UI Loading] Cargando...';
export const DESACTIVAR_LOADING = '[UI Loading] Fin de carga...';

export class activarLoadingAction implements Action {
    readonly type = ACTIVAR_LOADING;
}
export class desactivarLoadingAction implements Action {
    readonly type = DESACTIVAR_LOADING;
}

export type actions = activarLoadingAction | desactivarLoadingAction;