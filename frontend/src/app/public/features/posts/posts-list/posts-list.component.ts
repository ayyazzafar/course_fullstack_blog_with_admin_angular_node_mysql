import { AfterContentInit, Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../../core/services/post.service';
import { IPost } from '../../../../core/interfaces/models/post.model.interface';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent implements AfterContentInit {
  @Input() categoryId?: number;
  @Input() tagId?: number;
  posts: IPost[] = [];
  postService = inject(PostService);


  ngAfterContentInit(){
    this.postService.getPosts({
      categoryId: this.categoryId,
      tagId: this.tagId
    }).subscribe((data)=>{
      this.posts = data;
    });
  }

}
