// We'll use NgRx to replace our service-rxjs approach to
// managing the Application State
import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { ADD_INGREDIENT } from "./shopping-list.actions";

// NgRx reducer is just a function that takes in the state and a
// dispatched action, changes (a copy of) the state and sends it
// to the store

// The reducer expects arguments: current state, and action
// the NgRx package will eventually call this function and pass
// these arguments into them

// You can set an initial state. your state should be a js object
// most of the time (that way you can group multiple, diff kinds
// of data together in the state)
const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Bananas', 5)
    ]
}

// Pass initialState as default state
export function shoppingListReducer(state = initialState, action: Action) {
    // Find out which kind of action was dispatched
    switch(action.type) {
        // Which action types your app has, is totally up to you
        case ADD_INGREDIENT: // convention = all caps type names
            // NEVER touch the previous state: it's forbidden, it should be immmutable
            // Reducer always returns a (new/modified copy of the) state
            return {
                ...state,
                ingredients: [
                    ... state.ingredients,
                    action // this is wrong, we'll look at actions later
                ]
            }
    }
}
