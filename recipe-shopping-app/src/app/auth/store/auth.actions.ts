import { Action } from "@ngrx/store";
import { User } from "../user.model";

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export class Login implements Action {
    readonly type = LOGIN;

    // When logging in, the logged in user will be passed:
    constructor(payload: User) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
    // When logging out, nothing is passed: 
    // we will set user to null in the reducer
}
