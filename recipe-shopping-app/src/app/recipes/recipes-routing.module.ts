import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth-guard.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const recipeRoutes: Routes = [
    { path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
        {path: '', component: RecipeStartComponent},
        {path: 'new', component:RecipeEditComponent}, // has to be above the :id path, or it'll handle 'new' as an id
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: RecipeEditComponent},
    ]},
]

@NgModule({
    imports: [ RouterModule.forChild(recipeRoutes) ], // forChild merges this routing config with the root routing
    exports: [ RouterModule ]
})
export class RecipesRoutingModule { }
