import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "./ingredient.model";

export class ShoppingListService{

  // ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      getIngredients(){
        return this.ingredients.slice();
      }

      getIngredient(index: number): Ingredient{
        return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        // this.ingredientChanged.emit(this.ingredients.slice());
        this.ingredientChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }

        this.ingredients.push(...ingredients);
        // this.ingredientChanged.emit(this.ingredients.slice());
        this.ingredientChanged.next(this.ingredients.slice());
      }
}