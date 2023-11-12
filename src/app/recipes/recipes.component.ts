import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipe: Recipe;
  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
    // this.recipeService.selectedRecipe.subscribe(
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //   })
    //routing, no need for this
  }

}
