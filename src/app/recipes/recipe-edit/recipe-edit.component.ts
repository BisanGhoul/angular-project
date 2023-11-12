import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
    // console.log(this.recipeService.getRecipeById(this.id));
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );

    if(!this.isEditMode){
      this.recipeService.addRecipe(newRecipe);
      //or since recipe model has the same names and format
      // this.recipeService.addRecipe(this.recipeForm.value);

    }else{
      this.recipeService.updateRecipe(this.id,newRecipe);
    }
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(0,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
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
                'name': new FormControl(ing.name, Validators.required),
                'amount': new FormControl(ing.amount,[
                   Validators.required,
                   Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            )
          }
        }
      }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),//if we are in editmode will have the name of the recipe, if not will be empty
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIngredients
    })
  }

}
