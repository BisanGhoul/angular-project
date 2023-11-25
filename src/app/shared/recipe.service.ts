import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "./ingredient.model";
import { ShoppingListService } from "./shoppinglist.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
 
    recipesChanged = new Subject<Recipe[]>();
    // selectedRecipe = new EventEmitter<Recipe>();
    // selectedRecipe = new Subject<Recipe>();
    //actually no need because we used routing

    private recipes : Recipe[] = [
        new Recipe("Maqloubeh", "Palestinian cuisine",
    "https://jonoandjules.files.wordpress.com/2019/06/maqloubeh-rice-with-aubergines-peppers.jpg?w=584",
    [new Ingredient("Rice",2)]),

    new Recipe("Maqloubaah 2", "Palestinian cuisine",
    "https://jonoandjules.files.wordpress.com/2019/06/maqloubeh-rice-with-aubergines-peppers.jpg?w=584",
    [new Ingredient("Rice",2), new Ingredient("Tomatoe",3)])

    ];

    constructor(private shoppingService: ShoppingListService){}

    public getRecipes(){
        return this.recipes.slice();
    }

    public getRecipeById(index: number){
        return this.recipes[index];
    }
    public addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.shoppingService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());

    }
}