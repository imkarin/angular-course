// Service for Http functionality, storing data
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

// You NEED Injectable decorator, because you're going to inject the http service into it.
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put<Recipe[]>(
            'url_redacted',
            recipes
        )
        .subscribe(res => {
            console.log('Stored recipes!');
            console.log(res);
        })
    }

    fetchRecipes() {
    }
}
