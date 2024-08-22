import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService)

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });


  submit() {

    this.authService.forgotPassword(
      this.form.value.email!
    ).subscribe({
      next: () => {
        console.log('forgot password');
      },
      error: (err) => {
        if(err && err.error && err.error.message){
          alert(err.error.message)
        }
        console.error(err);
      }
    });



  }


}
