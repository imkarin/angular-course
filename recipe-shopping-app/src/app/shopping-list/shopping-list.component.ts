import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private slService: ShoppingListService,
    private store: Store<{shoppingList:{ ingredients:Ingredient[] }}>
    // NgRx gives us an injectable store that makes it easy for us 
    // to access our Application State (which is stored in that store)
    // The type you pass to this generic class is the 'form' of your store:
    // {keyYouDefinedEarlier: typeOfWhatYourReducerFunctionReturns}
    // so now: {shoppingList: {ingredients:Ingredient[]}}
  ) { }

  ngOnInit(): void {
    // select method: select a slice of the state
    // this returns an observable yielding our 'shoppingList' part of the store
    this.ingredients = this.store.select('shoppingList')

  }

  onEditItem(itemIndex: number) {
    this.slService.startedEditing.next(itemIndex);
  }

  // NgRx/Angular automatically unsubscribe from NgRx subscriptions
}
