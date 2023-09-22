import { EventEmitter } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "./ingredient.model";

export class RecipeService{
 
    selectedRecipe = new EventEmitter<Recipe>();
    private recipes : Recipe[] = [
        new Recipe("Maqloubeh", "Palestinian cuisine",
    "https://jonoandjules.files.wordpress.com/2019/06/maqloubeh-rice-with-aubergines-peppers.jpg?w=584",
    [new Ingredient("Rice",2)]),

    new Recipe("Maqloubaah 2", "Palestinian cuisine",
    "https://jonoandjules.files.wordpress.com/2019/06/maqloubeh-rice-with-aubergines-peppers.jpg?w=584",
    [new Ingredient("Rice",2), new Ingredient("Tomatoe",3)])

    ];

    public getRecipes(){
        return this.recipes.slice();
    }
}