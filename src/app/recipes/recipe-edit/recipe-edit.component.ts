import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  isEditMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private activatedRpute:ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.activatedRpute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.isEditMode = params['id'] != null;
        this.initForm();//whener our route parents change, because that indicates that we reloaded the page

      }
    )
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    console.log(this.recipeService.getRecipeById(this.id));
  }

  private initForm(){
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

      if(this.isEditMode){
        const recipe: Recipe = this.recipeService.getRecipeById(this.id);

        recipeName = recipe.name;
        recipeImgPath = recipe.imgPath;
        recipeDesc = recipe.description;
        if(recipe['ingredients']){
          for(let ing of recipe.ingredients){
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ing.name),
                'amount': new FormControl(ing.amount)
              })
            )
          }
        }
      }

    this.recipeForm = new FormGroup({
      'name:': new FormControl(recipeName),//if we are in editmode will have the name of the recipe, if not will be empty
      'imagePath': new FormControl(recipeImgPath),
      'description': new FormControl(recipeDesc),
      'ingredients': recipeIngredients
    })
  }

}
