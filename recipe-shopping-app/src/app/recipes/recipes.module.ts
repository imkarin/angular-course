import { NgModule } from "@angular/core";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

// This module should be responsible for defining the building blocks for the recipe feature area
@NgModule({
    declarations: [ // all recipe-related components should be here
        RecipesComponent, // remove them from the AppModule
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        // in declarations, you don't only declare components that you'll use in templates,
        // but ALSO components that you load via routing (like RecipesComponent for /recipes)
    ],
    imports: [
        RecipesRoutingModule, // RouterModule for recipes separate, for leaner code
        SharedModule
    ],
    exports: [ 
        // we don't have to export above components (in declarations) anymore,
        // because they're only being used:
        // - embedded in the components above
        // - or in the RecipesRoutingModule
        // both are part of this file, and aren't used elsewhere, 
        // so exporting them = unnessecary
    ]
})
export class RecipesModule { }
