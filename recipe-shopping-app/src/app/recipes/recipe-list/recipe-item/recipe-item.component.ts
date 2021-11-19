import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  // this property valuee is bound using its original name:
  // @Input() recipeName: string;

  // this property value is bound to a *different* property name (in the parent component)
  // when this component is instantiated in a template:
  @Input('rName') recipeName: string;


  constructor() { }

  ngOnInit(): void {
  }

}
