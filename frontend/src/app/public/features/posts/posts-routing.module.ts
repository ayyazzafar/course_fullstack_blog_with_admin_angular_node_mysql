import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  {path: '', component: PostsListComponent},
  {path: 'post/:slug', component: PostDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
