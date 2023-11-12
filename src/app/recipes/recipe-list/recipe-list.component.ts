import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  current = this.recipes[0];
  subscription: Subscription;

  constructor(private recipeService : RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute){}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    }

  ngOnInit(): void {
   this.subscription = this.recipeService.recipesChanged.subscribe(
    (recipes: Recipe[]) =>{
      this.recipes  = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  addRecipe(){
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }
}
