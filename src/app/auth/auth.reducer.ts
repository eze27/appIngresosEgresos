
import * as fromAuth from './auth.actions';
import { User } from './user.model';
import { Action } from '@ngrx/store';

export interface authState { 
    user:User
}

export const initState:authState = {
    user:null
}

export function authReducer( state = initState,action:fromAuth.actions) {

    switch (action.type) {
        case fromAuth.SET_USER:
            return { user:{...action.user}}
    
        default:
            return state;
    }
}