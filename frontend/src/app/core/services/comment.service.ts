import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IComment } from '../interfaces/models/comment.model.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl= environment.BACKEND_API_URL+'/api/comments';
  httpClient = inject(HttpClient);

  constructor() { }

  getComments(postId: number) {
    return this.httpClient.get<IComment[]>(`${this.baseUrl}/${postId}`);
  }
}
