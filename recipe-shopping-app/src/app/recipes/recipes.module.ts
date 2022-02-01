import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

import { RecipesRoutingModule } from "./recipes-routing.module";

// This module should be responsible for defining the building blocks for the recipe feature area
@NgModule({
    declarations: [ // all recipe-related components should be here
        RecipesComponent, // remove them from the AppModule
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        RecipesRoutingModule, // RouterModule for recipes separate, for leaner code

        CommonModule
    ],
    exports: [ // export all components, so that they can be used in any module that imports this module
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ]
})
export class RecipesModule { }
