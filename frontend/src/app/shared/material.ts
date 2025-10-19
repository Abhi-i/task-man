import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

export const matSharedModules = [
  CommonModule,
  ReactiveFormsModule,
  RouterModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
];
