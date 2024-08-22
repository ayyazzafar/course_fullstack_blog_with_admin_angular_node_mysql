import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    RouterModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router)

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      //Password must contain at least one uppercase letter, one lowercase letter and one number.
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    ]]
  });


  submit() {
    this.authService.register({
      name: this.form.value.name!,
      email: this.form.value.email!,
      password: this.form.value.password!
    }).subscribe({
      next: () => {
        console.log('registered');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
       
        console.error(err);
      }
    });
  }
}
