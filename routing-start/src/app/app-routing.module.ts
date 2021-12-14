import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

// add routing (appRoutes = all the routes of the application)
const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }, // :id is a parameter, you can later retrieve this inside of the loaded component
    ]}, // don't add the slash to the path! the component is the page shown on this route
    { path: 'servers', 
      // canActivate: [AuthGuard], // pass guards in canActivate
      canActivateChild: [AuthGuard], // canActivate for childroutes
      component: ServersComponent, 
      children: [ 
        { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}}, // resolve maps the data returned from ServerResolver to the 'server' object (can be any name), 
                                                                                       // which can be used in the loaded component
        { path: ':id/edit', component: EditServerComponent} // ServersComponent can now contain a router-outlet for these children
    ]},
    // { path: 'not-found', component: PageNotFoundComponent},
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found'}}, // data gets passed to the component
    { path: '**', redirectTo: '/not-found'}, // ** = wildcard 'catch all paths we don't know', make sure it's the last route!
  ];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes) // register our routes with the routing functionality
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
