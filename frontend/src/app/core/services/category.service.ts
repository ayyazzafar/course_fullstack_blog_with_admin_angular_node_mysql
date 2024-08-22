import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ICategory } from '../interfaces/models/category.model.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = environment.BACKEND_API_URL + '/api/categories';
  httpClient = inject(HttpClient);
  authService = inject(AuthService);
  

  constructor() { }

  getCategoryBySlug(slug: string) {
    return this.httpClient.get<ICategory>(`${this.baseUrl}/slug/${slug}`);
  }


  getCategories() {
    return this.httpClient.get<ICategory[]>(this.baseUrl);
  }

  deleteCategory(id: number) {
    const ob =  this.httpClient.delete(`${this.baseUrl}`, {
      body: { id }
    })

    return ob;
  }

  addCategory({name}:{name: string}) {
    return this.httpClient.post<ICategory>(this.baseUrl, {name});
  }

  updateCategory({id, name}: {id: number, name: string}){
    return this.httpClient.put<ICategory>(this.baseUrl, {id, name});
  }
}
