import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private subs: Subscription;
  constructor(private shoppingService : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.subs = this.shoppingService.ingredientChanged.subscribe(
      (eventIngredients: Ingredient[]) => {
        this.ingredients = eventIngredients;
      }
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
