import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    // this tells Angular: 'from this module, if i were to add this module to 
    // the imports of another module, what should be accessible to that module?
    // has been configured above, and with this step it'll be accessible
})
export class AppRoutingModule {}
