import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private dataStorageService: DataStorageService,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onClickSave() {
    this.dataStorageService.storeRecipes();
  }

  onClickFetch() {
    this.dataStorageService.fetchRecipes();
  }
}
