// Service for Http functionality, storing data
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

// You NEED Injectable decorator, because you're going to inject the http service into it.
@Injectable({providedIn: 'root'})
export class DataStorageService {
    private fireBaseUrl = environment["FIREBASE_URL"]

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put<Recipe[]>(
            this.fireBaseUrl + '/recipes.json',
            recipes
        )
        .subscribe(res => {
            console.log('Stored recipes!');
            console.log(res);
        })
    }

    fetchRecipes() {
        this.http.get<Recipe[]>(this.fireBaseUrl + '/recipes.json')
        .subscribe(recipes => {
            this.recipeService.setRecipes(recipes);
        })
    }
}
