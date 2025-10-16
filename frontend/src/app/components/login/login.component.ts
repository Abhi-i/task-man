// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matSharedModules } from '../../shared/material';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...matSharedModules],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login form data:', this.loginForm.value);
      // call login API here
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
