import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsListComponent } from "../../posts/posts-list/posts-list.component";

@Component({
  selector: 'app-tag-detail',
  standalone: true,
  imports: [ PostsListComponent],
  templateUrl: './tag-detail.component.html',
  styleUrl: './tag-detail.component.scss'
})
export class TagDetailComponent {

   route = inject(ActivatedRoute);
   tag = ''

    constructor() {
      this.route.params.subscribe(params => {
        this.tag = params['tag'];
      });
    }
        

}
