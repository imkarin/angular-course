import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    shoppingList = [
        new Ingredient('Apples', 5),
        new Ingredient('Strawberries', 20)
    ]

    shoppingListUpdate = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    getShoppingList() {
        return this.shoppingList.slice();
    }

    getIngredient(index: number) {
        return this.shoppingList[index];
    }

    setIngredient(index: number, updatedIngredient: Ingredient) {
        this.shoppingList[index] = updatedIngredient;
        this.shoppingListUpdate.next(this.shoppingList.slice()); // event: shoppinglist updated!
    }

    deleteIngredient(index: number) {
        this.shoppingList.splice(index, 1);
        this.shoppingListUpdate.next(this.shoppingList.slice()); // event: shoppinglist updated!
    }

    addIngredient(newIngredient: Ingredient) {
        this.shoppingList.push(newIngredient); // add ingredient to shoppinglist
        this.shoppingListUpdate.next(this.shoppingList.slice()); // event: shoppinglist updated!
    }
}
