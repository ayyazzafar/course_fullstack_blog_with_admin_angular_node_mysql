import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPostTag } from '../interfaces/models/post-tag.model.interface';
import { IPost } from '../interfaces/models/post.model.interface';
import { ITag } from '../interfaces/models/tag.model.interface';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  baseUrl = environment.BACKEND_API_URL + '/api/tags';
  httpClient = inject(HttpClient);

  constructor() { }

  getPostTags(id: number) {
    return this.httpClient.get<IPostTag[]>(this.baseUrl + '/getPostTagRelations/' + id);
  }

  getTag(slug: string) {
    return this.httpClient.get<ITag>(this.baseUrl + '/getTagBySlug/' + slug);
  }

  getTags() {
    return this.httpClient.get<ITag[]>(this.baseUrl);
  }

  deleteTag(id: number) {
    return this.httpClient.delete(this.baseUrl, {
      body: {
        id
      }
    });
  }

  addTag({
    name
  }: {
    name?: string

  }) {
    return this.httpClient.post(this.baseUrl, {
      name
    });
  }

  updateTag({
    id,
    name
  }: {
    id?: number,
    name?: string

  }) {
    return this.httpClient.put(this.baseUrl, {
      id,
      name
    });
  }

}
