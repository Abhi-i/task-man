// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matSharedModules } from '../../shared/material';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [...matSharedModules],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Register form data:', this.registerForm.value);
      // call register API here
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
