import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../recipe.model';

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

  onSubmit() {
    console.log(this.recipeForm);
  }

  private initForm(){
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';

      if(this.isEditMode){
        const recipe: Recipe = this.recipeService.getRecipeById(this.id);

        recipeName = recipe.name;
        recipeImgPath = recipe.imgPath;
        recipeDesc = recipe.description;
      }

    this.recipeForm = new FormGroup({
      'name:': new FormControl(recipeName),//if we are in editmode will have the name of the recipe, if not will be empty
      'imagePath': new FormControl(recipeImgPath),
      'description': new FormControl(recipeDesc)
    })
  }

}
