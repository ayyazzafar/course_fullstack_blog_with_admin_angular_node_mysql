import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagsEditorComponent } from './tags-editor/tags-editor.component';

const routes: Routes = [
  {
    path: '', component: TagsListComponent
  },
  {
    path:'add', component: TagsEditorComponent
  },
  {
    path:'edit/:slug', component: TagsEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
