import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: "full"},
    {path: 'recipes', component: RecipesComponent, children:[
        {path: ':id', component: RecipeItemComponent}
        // ,
        // {path: ':id/edit', component: Rec}
    ]},
    {path: 'shopping-list', component: ShoppingListComponent}


];

@NgModule({
	imports:[
RouterModule.forRoot(routes)
],
exports: [RouterModule]

})
export class AppRoutingModule{

}