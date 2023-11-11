import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscibtion: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService : ShoppingListService) { }

  ngOnInit() {
    this.subscibtion = this.shoppingService.startEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onSubmitItem(form: NgForm) {// add new item or update selected item from the list
    const value = form.value;
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false; //or else we will get stuck in the dit mode
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false; //or else we will get stuck in the dit
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();  
  }

  ngOnDestroy(): void {
    this.subscibtion.unsubscribe();
  }

}
