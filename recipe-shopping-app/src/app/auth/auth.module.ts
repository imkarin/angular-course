import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        SharedModule, // for ngIf and ngFor (CommonModule), and the spinner
        FormsModule, // we use a form to login
        RouterModule.forChild([{ path: '', component: AuthComponent}])
    ]
})
export class AuthModule { }
