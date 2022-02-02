import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  startedEditingSub: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;

  constructor(
    private slService: ShoppingListService,
    private store: Store<{ shoppingList:{ ingredients:Ingredient[] }} >
  ) { }

  ngOnInit(): void {
    this.startedEditingSub = this.slService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.getIngredient(this.editedItemIndex);

      // Put the clicked item's values in the form
      this.slForm.setValue({
        'name': this.editedItem.name,
        'amount': this.editedItem.amount
      })
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
  
    // If editMode is off, we're adding a new item - otherwise we're updating an existing one
    if (!this.editMode) { 
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(
        new ShoppingListActions.AddIngredient(newIngredient)
      );
    } else {
      this.slService.setIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    }

    // Empty the form fields
    form.reset();
  }

  onDeleteItem() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy(): void {
      this.startedEditingSub.unsubscribe();
  }
}
