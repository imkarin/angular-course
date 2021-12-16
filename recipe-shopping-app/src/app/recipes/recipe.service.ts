import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe('Pancakes', 'American pancakes with fresh fruit', 'https://images.pexels.com/photos/7937478/pexels-photo-7937478.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'),
    new Recipe('Brownies', 'Fudgy dark chocolate-coffee brownies', 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  recipeSelected = new EventEmitter<Recipe>();
}
