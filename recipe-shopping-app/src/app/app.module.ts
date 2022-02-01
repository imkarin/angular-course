import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    // be sure that every component is only in one declarations[] inside your app,
    // you can't have a component here AND in SharedModule's declarations[]
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RecipesModule, // our custom feature module (import these for the routing)
    ShoppingListModule, // our custom feature module (import these for the routing)
    SharedModule // our shared module (we still import this, because
                 // it contains directives that we need in the header etc)
  ],
  providers: [
    ShoppingListService, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
