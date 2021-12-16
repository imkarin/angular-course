import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipeService]  // provide here so recipe-list and recipe-detail use same recipes
})
export class RecipesComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
