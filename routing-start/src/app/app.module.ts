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

// add routing (appRoutes = all the routes of the application)
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent }, // don't add the slash to the path!
                                                // the component is the page shown on this route
  { path: 'users/:id/:name', component: UserComponent }, // :id is a parameter, you can later retrieve this inside of the loaded component
  { path: 'servers', component: ServersComponent},
  { path: 'servers/:id', component: ServerComponent},
  { path: 'servers/:id/edit', component: EditServerComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent
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
