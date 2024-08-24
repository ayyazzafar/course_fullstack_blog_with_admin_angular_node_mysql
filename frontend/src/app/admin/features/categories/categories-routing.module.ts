import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';

const routes: Routes = [
  {
    path:'', component: CategoriesListComponent
  },
  {
    path:'add', component: CategoryEditorComponent
  },
  {
    path:'edit/:slug', component: CategoryEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
