import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

// recommendeded convention: name the const the same as the action type
// we can import this in the reducer and avoid typos in the action type
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT; // readonly = this must never be changed from outside

    // Adding payload through the contstructor lets us pass the payload
    // as an argument when we create a new AddIngredient() action
    constructor(public payload: Ingredient) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient) { } // gets the new ingredient
    // ^already knows which ingredient we're editing through state.editedIngredient
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    // we don't need to pass a payload: we already know which item we're
    // currently editing through state.editedIngredient    
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    
    constructor(public payload: number) { } // index of the ingredient we're editing
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

// In the reducer, the action that the reducer receives as an argument is no longer
// just of type AddIngredient: it could be one of the three above.
// Therefore we create a union type which can mean one of the three:
export type ShoppingListActions = 
    AddIngredient | 
    UpdateIngredient | 
    DeleteIngredient |
    StartEdit |
    StopEdit;
