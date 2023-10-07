import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // @Input() recipeToShow: Recipe;
  recipeToShow: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeToShow = this.recipeService.getRecipeById(this.id);

      }
    )

  }

  onAddToShopingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipeToShow.ingredients)
  }

  editRecipe(){
    // this.router.navigate(['edit'],{ relativeTo: this.activatedRoute });
    this.router.navigate(['../',this.id,'edit'],{ relativeTo: this.activatedRoute });

  }

}
