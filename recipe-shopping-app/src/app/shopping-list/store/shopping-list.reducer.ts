import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

// NgRx reducer is just a function that takes in the state and a
// dispatched action, changes (a copy of) the state and sends it
// to the store.
// The reducer expects arguments: current state, and action
// the NgRx package will eventually call this function and pass
// these arguments into them

// We can declare the interface: how does our state FOR THIS REDUCER look
export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Bananas', 5)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            // NEVER touch the previous state: it's forbidden, it should be immmutable
            // Reducer always returns a (new/modified copy of the) state
            return {
                ...state,
                ingredients: [
                    ... state.ingredients,
                    action.payload // this is wrong, we'll look at actions later
                ]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredientToBeUpdated = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {     // remember, never mutate (part of) the old state!
                ...ingredientToBeUpdated,   // the above IngrToBeUpdated = an object = a reference type
                ...action.payload           // so we have to modify a COPY of it
            }
            const updatedIngredients = [...state.ingredients]; // again, make a copy first
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient, index) => {
                    return index !== state.editedIngredientIndex;
                })
            }
        case ShoppingListActions.START_EDIT:
            console.log(action.payload)
            return {
                ...state,
                editedIngredient: {...state.ingredients[action.payload]}, // copy!
                editedIngredientIndex: action.payload
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        default:
        // ngRx dispatches an "initialization" action and we need to handle this
            return state;
    }
}
