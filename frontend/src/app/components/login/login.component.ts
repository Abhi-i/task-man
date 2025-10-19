import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matSharedModules } from '../../shared/material';
import { ApiService } from '../../services/api.service';
import { APIS } from '../../app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...matSharedModules],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false
  private apiService = inject(ApiService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login form data:', this.loginForm.value);
      //call login api here
      this.isLoading = true;
      this.apiService.post(APIS.login, this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log('Login success:', res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify({
            username: res.username,
            email: res.email,
          }));
          this.isLoading = false
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          console.error('Login failed:', err.message);
          this.isLoading = false
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
