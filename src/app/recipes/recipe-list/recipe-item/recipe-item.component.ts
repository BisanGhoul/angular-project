import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipeDetails: Recipe;
  @Input() index: number;
  // recipeDetails: Recipe;


  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // this.recipeDetails = this.recipeService.getRecipeById(this.index);
  }


}


