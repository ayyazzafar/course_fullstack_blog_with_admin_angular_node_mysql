import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IComment } from '../interfaces/models/comment.model.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = environment.BACKEND_API_URL + '/api/comments';
  httpClient = inject(HttpClient);
  authService = inject(AuthService)

  constructor() { }

  getComments(postId: number) {
    return this.httpClient.get<IComment[]>(`${this.baseUrl}/${postId}`);
  }

  createComment(content: string, postId: number) {
    return this.httpClient.post<IComment>(`${this.baseUrl}`, { content, postId });
  }

  deleteComment(commentId: number) {
    return this.httpClient.delete<IComment>(`${this.baseUrl}`, {
      body:{
        commentId
      }
    });
  }
}
