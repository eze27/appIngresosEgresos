import * as fromUI from './shared/ui.reducers';
import { ActionReducerMap } from '@ngrx/store'; // para trabajar con varios reducers definidos

export interface appState {
    ui: fromUI.State
}
export const appReducers: ActionReducerMap<appState> = {
    ui: fromUI.uiReducer
}