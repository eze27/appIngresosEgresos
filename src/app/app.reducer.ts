import * as fromUI from './shared/ui.reducers';
import { ActionReducerMap } from '@ngrx/store'; // para trabajar con varios reducers definidos
import * as fromAuth from './auth/auth.reducer';
export interface appState {
    ui: fromUI.State,
    auth:fromAuth.authState
}
export const appReducers: ActionReducerMap<appState> = {
    ui: fromUI.uiReducer,
    auth:fromAuth.authReducer
}