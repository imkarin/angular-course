import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// add routing (appRoutes = all the routes of the application)
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }, // :id is a parameter, you can later retrieve this inside of the loaded component
  ]}, // don't add the slash to the path! the component is the page shown on this route
  { path: 'servers', component: ServersComponent, children: [
    { path: ':id', component: ServerComponent}, // these are now children of the 'servers' path
    { path: ':id/edit', component: EditServerComponent} // ServersComponent can now contain a router-outlet for these children
  ]},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'}, // ** = wildcard 'catch all paths we don't know', make sure it's the last route!
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes) // the routing functionality, forRoot allows us to register out appRoutes
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
