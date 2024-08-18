import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../interfaces/models/category.model.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl= environment.BACKEND_API_URL+'/api/categories';
  httpClient = inject(HttpClient);

  constructor() { }

  getCategoryBySlug(slug: string){
    return this.httpClient.get<ICategory>(`${this.baseUrl}/slug/${slug}`);
  }
}
