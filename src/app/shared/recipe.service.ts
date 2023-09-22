import { Recipe } from "../recipes/recipe.model";

export class RecipeService{
 
   private recipes : Recipe[] = [
        new Recipe("Maqloubeh", "Palestinian cuisine",
    "https://jonoandjules.files.wordpress.com/2019/06/maqloubeh-rice-with-aubergines-peppers.jpg?w=584"),
    new Recipe("Maqloubaah 2", "Palestinian cuisine",
    "https://jonoandjules.files.wordpress.com/2019/06/maqloubeh-rice-with-aubergines-peppers.jpg?w=584")
    ];

    public getRecipes(){
        return this.recipes.slice();
    }
}