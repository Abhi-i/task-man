import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { matSharedModules } from '../../shared/material';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    ...matSharedModules,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
})
export class NewTaskComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private dialogRef = inject(MatDialogRef<NewTaskComponent>);
  user = JSON.parse(localStorage.getItem('user') || '{}');

  taskForm: FormGroup = this.fb.group({
  title: ['', Validators.required],
  description: ['', Validators.required],
  status: ['pending', Validators.required],
});

  createTask() {
    const payload = { ...this.taskForm.value, email: this.user.email };
    this.api.post('tasks/create', payload).subscribe({
      next: res => {
        console.log('✅ Task created', res);
        this.dialogRef.close(res); // return created task to parent
      },
      error: err => console.error('❌ Task creation failed', err.message),
    });
  }

  close() {
    this.dialogRef.close();
  }
}
