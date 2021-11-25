import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Strawberries', 25),
    new Ingredient('Raspberries', 15)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addIngredientToList(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
  }
}
