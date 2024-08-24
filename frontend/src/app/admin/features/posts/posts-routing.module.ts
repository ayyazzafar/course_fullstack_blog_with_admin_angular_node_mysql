import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostEditorComponent } from './post-editor/post-editor.component';

const routes: Routes = [
  {path: '', component: PostsListComponent},
  {
    path:'add', component: PostEditorComponent
  },
  {
    path:'edit/:slug', component: PostEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
