import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.route.params.subscribe((routeParams) =>{
      const recipeId = routeParams['id'];  // prepend + to make it a number
      this.recipe = this.recipeService.getRecipe(recipeId); // find recipe based on id in route
    })
  }
}
