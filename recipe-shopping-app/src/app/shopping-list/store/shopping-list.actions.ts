import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

// recommendeded convention: name the const the same as the action type
// we can import this in the reducer and avoid typos in the action type
export const ADD_INGREDIENT = 'ADD_INGREDIENT' 

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT; // readonly = this must never be changed from outside
    
    // Adding payload through the contstructor lets us pass the payload
    // as an argument when we create a new AddIngredient() action
    constructor(public payload: Ingredient) { };
}
