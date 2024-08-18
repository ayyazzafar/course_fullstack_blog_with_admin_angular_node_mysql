import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsListComponent } from "../../posts/posts-list/posts-list.component";
import { TagService } from '../../../../core/services/tag.service';
import { ITag } from '../../../../core/interfaces/models/tag.model.interface';

@Component({
  selector: 'app-tag-detail',
  standalone: true,
  imports: [PostsListComponent],
  templateUrl: './tag-detail.component.html',
  styleUrl: './tag-detail.component.scss'
})
export class TagDetailComponent {

  route = inject(ActivatedRoute);
  tag?: ITag;
  tagService = inject(TagService);

  constructor() {
    this.route.params.subscribe(params => {
      const slug = params['tag'];

      this.loadTag(slug);
    });
  }

  loadTag(slug: string) {
    if (slug)
      this.tagService.getTag(slug).subscribe((data) => {
        this.tag = data;
      });
  }


}
