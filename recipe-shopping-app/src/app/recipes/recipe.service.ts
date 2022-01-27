import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // recipes: Recipe[] = [
  //   new Recipe(1, 'Pancakes', 'American pancakes with fresh fruit', 'https://images.pexels.com/photos/7937478/pexels-photo-7937478.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
  //   new Recipe(2, 'Brownies', 'Fudgy dark chocolate-coffee brownies', 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
  // ];
  recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.find(element => element['id'] == id);
  }

  setRecipes(newRecipes: Recipe[]) {
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
