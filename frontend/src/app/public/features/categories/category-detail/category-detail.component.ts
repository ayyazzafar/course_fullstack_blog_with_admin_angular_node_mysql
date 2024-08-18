import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsListComponent } from '../../posts/posts-list/posts-list.component';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    PostsListComponent
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent {
  route = inject(ActivatedRoute);
  category = ''

   constructor() {
     this.route.params.subscribe(params => {
       this.category = params['category'];
     });
   }
}
