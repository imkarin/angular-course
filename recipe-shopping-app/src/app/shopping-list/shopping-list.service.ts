import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    shoppingList = [
        new Ingredient('Apples', 5),
        new Ingredient('Strawberries', 20)
    ]

    shoppingListUpdate = new Subject<Ingredient[]>();

    getShoppingList() {
        return this.shoppingList.slice();
    }

    addIngredient(newIngredient: Ingredient) {
        this.shoppingList.push(newIngredient); // add ingredient to shoppinglist
        this.shoppingListUpdate.next(this.shoppingList); // event: shoppinglist updated!
    }
}
