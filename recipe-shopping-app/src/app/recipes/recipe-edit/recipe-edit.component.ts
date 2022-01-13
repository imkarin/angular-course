import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipeId: number;
  editMode: boolean = false;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // determine: are we in /new or in /:id/edit?
    this.route.params.subscribe((routeParams: Params) => {
      this.recipeId = +routeParams['id'];
      this.editMode = routeParams['id'] != null;
      console.log(this.recipeId)
    })
  }

}
