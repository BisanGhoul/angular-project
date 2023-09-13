import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelectedFromList = new EventEmitter<Recipe>();
  recipes : Recipe[] = [
    new Recipe("Maqloubeh", "Palestinian cuisine",
"https://jonoandjules.files.wordpress.com/2019/06/maqloubeh-rice-with-aubergines-peppers.jpg?w=584"),
new Recipe("Maqloubaah 2", "Palestinian cuisine",
"https://jonoandjules.files.wordpress.com/2019/06/maqloubeh-rice-with-aubergines-peppers.jpg?w=584")
];

current = this.recipes[0];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelectedFromList(recipe: Recipe){
    this.recipeSelectedFromList.emit(recipe);
  }
}
