import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
    readonly type = LOGIN;

    // When logging in, the logged in user will be passed:
    constructor(public payload: {
        email: string,
        userId: string,
        token: string,
        expirationDate: Date
    }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
    // When logging out, nothing is passed: 
    // we will set user to null in the reducer
}

export type AuthActions = Login | Logout;
