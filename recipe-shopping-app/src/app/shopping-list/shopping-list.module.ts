import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [ // components used in this feature's templates, and used in routing
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        ShoppingListRoutingModule,
        SharedModule, // not super useful, in this case only replaces CommonModule
        FormsModule
    ]
})
export class ShoppingListModule { }
