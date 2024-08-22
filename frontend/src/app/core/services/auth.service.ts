import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUser } from '../interfaces/models/user.model.interface';
import { share } from 'rxjs';
import { Router } from '@angular/router';
export interface Session{
  accessToken: string
  refreshToken: string
  user: IUser
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http  = inject(HttpClient)
  router = inject(Router)
  session?: Session;



  constructor() { 
    let session = localStorage.getItem('session');
    if(session){
      this.session = JSON.parse(session);
    }
  }


  login({email, password}: {
    email: string,
    password: string
  }){
    let ob =  this.http.post<Session>(environment.BACKEND_API_URL+'/api/auth/login', {email, password}).pipe(share());


    ob.subscribe({
      next: (r)=>{
        this.session = r;
        localStorage.setItem('session', JSON.stringify(r));
        this.router.navigate(['/']);

      },
      error: (e)=>{
        // alert('Login failed');
      }
    });

    return ob;
  }

  logout(){
    this.session = undefined;
    localStorage.removeItem('session');
    this.router.navigate(['/auth/login']);
  }

  register(
    {
      name, 
      email,
      password
    }:{
      name: string,
      email: string,
      password: string
    }
  ){
    return this.http.post(environment.BACKEND_API_URL+'/api/auth/register', {
      name,
      email,
      password
    });
  }

  forgotPassword(email: String){
    return this.http.post(environment.BACKEND_API_URL+'/api/auth/forgot-password', {email});
  }

  resetPassword({token, password}: {token: string, password: string}){
    return this.http.post(environment.BACKEND_API_URL+'/api/auth/reset-password', {token, password});
  }
}
