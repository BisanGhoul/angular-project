import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, map, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authSer: AuthService
  ) {}

  //inject recipe service or tale recipes as an arg and save them
  storeRecipe() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-191eb-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((res) => {
        console.log(res); //sub where u call it (header comp) if u want to add a spinner for example
      }); // request will be sent when we subsrcibe
  }

  // fetchRecipes(){
  //     return this.authSer.user.pipe(
  //         take(1),
  //         exhaustMap(user =>{
  //             return this.http.get<Recipe[]>('https://ng-course-recipe-book-191eb-default-rtdb.firebaseio.com/recipes.json',
  //             {
  //                 params: new HttpParams().set('auth', user.token)
  //             }
  //             );
  //         }),
  //         map(recipes => {
  //             return recipes.map(recipe => {
  //                 return{
  //                     ...recipe,
  //                     ingredients: recipe.ingredients? recipe.ingredients : []
  //                 }
  //             })
  //         }),
  //         tap(recipes =>{
  //             this.recipesService.setRecipes(recipes)
  //         }))//or unsub right after

  // }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-191eb-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
}
