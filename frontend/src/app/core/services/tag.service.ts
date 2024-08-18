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

  baseUrl= environment.BACKEND_API_URL+'/api/tags';
  httpClient = inject(HttpClient);

  constructor() { }

  getPostTags(id: number) {
    return this.httpClient.get<IPostTag[]>(this.baseUrl + '/getPostTagRelations/'+id);
  }

  getTag(slug: string){
    return this.httpClient.get<ITag>(this.baseUrl + '/getTagBySlug/'+slug);
  }
}
