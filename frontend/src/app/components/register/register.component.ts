import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matSharedModules } from '../../shared/material';
import { ApiService } from '../../services/api.service';
import { APIS } from '../../app.config';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [...matSharedModules],
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss', './register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  private apiService = inject(ApiService);
  isLoading: boolean = false

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Register form data:', this.registerForm.value);
      this.isLoading = true
      this.apiService.post(APIS.register, this.registerForm.value).subscribe({
        next: (res: any) => {
          console.log('Login success:', res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify({
            username: res.username,
            email: res.email,
          }));
          this.isLoading = false
        },
        error: (err) => {
          console.error('Registration failed:', err.message);
          this.isLoading = false
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
