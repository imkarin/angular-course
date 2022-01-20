import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  shoppingListSub: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getShoppingList();

    // Get updates from shoppinglist service
    this.shoppingListSub = this.slService.shoppingListUpdate.subscribe((updatedShoppingList) => {
      this.ingredients = updatedShoppingList;
    })
  }

  onEditItem(itemIndex: number) {
    this.slService.startedEditing.next(itemIndex);
  }

  ngOnDestroy(): void {
      this.shoppingListSub.unsubscribe();
  }
}
