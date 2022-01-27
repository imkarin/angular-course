import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesChangedSub: Subscription;

  constructor(private recipeService: RecipeService) { }
  
  ngOnInit(): void {
    // get the recipes from the service
    this.recipes = this.recipeService.getRecipes();

    this.recipesChangedSub = this.recipeService.recipesChanged.subscribe(
      updatedRecipes => {
        this.recipes = updatedRecipes;
      }
    )
  }

  ngOnDestroy(): void {
    this.recipesChangedSub.unsubscribe();
  }
}
