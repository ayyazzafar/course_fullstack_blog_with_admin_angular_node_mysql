import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsListComponent } from '../../posts/posts-list/posts-list.component';
import { CategoryService } from '../../../../core/services/category.service';
import { ICategory } from '../../../../core/interfaces/models/category.model.interface';

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
  categoryService = inject(CategoryService)
  category?: ICategory;

   constructor() {
     this.route.params.subscribe(params => {
       let slug = params['category'];


       this.loadCategory(slug)
     });
   }

   loadCategory(slug: string) {
    this.categoryService.getCategoryBySlug(slug).subscribe((data) => {
      this.category = data;
    })
   }
}
