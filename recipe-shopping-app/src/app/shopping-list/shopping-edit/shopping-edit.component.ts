import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit(): void {
    // to be sure, still store this subscription in a variable and unsubscribe from it in ngOnDestroy
    this.subscription = this.store.select('shoppingList') // remember this returns an observable containing the shoppinglist state
      .subscribe(changedStateData => {
        if (changedStateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = changedStateData.editedIngredient;
          
          // Show the clicked item in the form controls:
          this.slForm.setValue({
            'name': this.editedItem.name,
            'amount': this.editedItem.amount
          })
        } else {
          this.editMode = false;
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
  
    // If editMode is off, we're adding a new item - otherwise we're updating an existing one
    if (!this.editMode) { 
      this.store.dispatch(
        new ShoppingListActions.AddIngredient(newIngredient)
      );
    } else {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
      this.editMode = false;
      this.store.dispatch(new ShoppingListActions.StopEdit())
    }

    // Empty the form fields
    form.reset();
  }

  onDeleteItem() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
    );
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit())
    this.slForm.reset();
  }

  onClear() {
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit())
    this.slForm.reset();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // Dispatch 'STOP_EDIT' action here too, or else we'll get strange behaviour
    // the next time we visit this edit component:
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }
}
