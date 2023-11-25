import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient,
                private recipesService: RecipeService){}

    //inject recipe service or tale recipes as an arg and save them            
    storeRecipe(){
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://ng-course-recipe-book-191eb-default-rtdb.firebaseio.com/recipes.json',
        recipes).subscribe(
            res => {
                console.log(res);//sub where u call it (header comp) if u want to add a spinner for example
            }
        )// request will be sent when we subsrcibe 
    }

    fetchRecipes(){
        this.http.get<Recipe[]>('https://ng-course-recipe-book-191eb-default-rtdb.firebaseio.com/recipes.json').subscribe(
            res => {
                this.recipesService.setRecipes(res);
            }
        )
    }

}








