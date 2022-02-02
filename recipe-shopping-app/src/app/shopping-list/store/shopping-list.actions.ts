import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

// recommendeded convention: name the const the same as the action type
// we can import this in the reducer and avoid typos in the action type
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT; // readonly = this must never be changed from outside

    // Adding payload through the contstructor lets us pass the payload
    // as an argument when we create a new AddIngredient() action
    constructor(public payload: Ingredient) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: {index: number, newIngredient: Ingredient}) { }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;

    constructor(public payload: number) { }
}

// In the reducer, the action that the reducer receives as an argument is no longer
// just of type AddIngredient: it could be one of the three above.
// Therefore we create a union type which can mean one of the three:
export type ShoppingListActions = AddIngredient | UpdateIngredient | DeleteIngredient;
