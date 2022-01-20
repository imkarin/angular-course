import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

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

  constructor(private slService: ShoppingListService) { }

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

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
  
    // If editMode is off, we're adding a new item - otherwise we're updating an existing one
    if (!this.editMode) { 
      this.slService.addIngredient(newIngredient);
    } else {
      this.slService.setIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    }

    // Empty the form fields
    form.reset();
  }

  onDeleteItem(form: NgForm) {
    this.slService.deleteIngredient(this.editedItemIndex);
    form.reset();
  }

  ngOnDestroy(): void {
      this.startedEditingSub.unsubscribe();
  }
}
