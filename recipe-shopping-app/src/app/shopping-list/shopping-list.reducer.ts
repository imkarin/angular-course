// We'll use NgRx to replace our service-rxjs approach to
// managing the Application State
import { Ingredient } from "../shared/ingredient.model";

// NgRx reducer is just a function that takes in the state and a
// dispatched action, changes (a copy of) the state and sends it
// to the store

// The reducer expects arguments: current state, and action
// the NgRx package will eventually call this function and pass
// these arguments into them

// Uou can set an initial state. your state should be a js object
// most of the time (that way you can group multiple, diff kinds
// of data together in the state)
const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Bananas', 5)
    ]
}
export function shoppingListReducer(state, action) {

}
