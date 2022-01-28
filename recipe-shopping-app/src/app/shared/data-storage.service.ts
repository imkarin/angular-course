// Service for Http functionality, storing data
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take, exhaustMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

// You NEED Injectable decorator, because you're going to inject the http service into it.
@Injectable({providedIn: 'root'})
export class DataStorageService {
    private fireBaseUrl = environment["FIREBASE_URL"];

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) {}

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
        // rxjs take(1) - emits only the first value emitted by the source observable.
        // simple words: we now subscribe to an observable (copy of the currentUser observable
        // output) that only emits once.
        this.authService.currentUser.pipe(
            take(1),
            exhaustMap(currentUser => {
                console.log(currentUser)
                return this.http.get<Recipe[]>(
                    this.fireBaseUrl + '/recipes.json',
                    {
                        params: new HttpParams().set('auth', currentUser.token)
                    }
                )
            })
        )
        .subscribe(recipes => {
            this.recipeService.setRecipes(recipes);
        })
    }
}
