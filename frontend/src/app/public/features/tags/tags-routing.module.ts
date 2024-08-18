import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagDetailComponent } from './tag-detail/tag-detail.component';

const routes: Routes = [
  {
    path: ':tag', component: TagDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
