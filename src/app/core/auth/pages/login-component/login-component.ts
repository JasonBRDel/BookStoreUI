import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { payload } from '../../interfaces/payload';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {

  token: string = '';
  loading: boolean = true;

  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  })


  onSubmit() {
    if (this.loginForm.invalid)
      return;

    this.loading = true;
    const payload: payload = { username: this.loginForm.value.username!, password: this.loginForm.value.password! }
    this.authService.login(payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          if (this.authService.authenticated()) {
            this.router.navigateByUrl('/')
            return;
          }
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => this.loading = false
      }
      )
  }


}
