import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../services/api.service';
import { APIS } from '../../app.config';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  tasks: any[] = [];
  taskForms: { [id: string]: FormGroup } = {};
  user = JSON.parse(localStorage.getItem('user') || '{}');

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.apiService.post('tasks/getByUser', { email: this.user.email }).subscribe({
      next: (res: any) => {
        this.tasks = res || [];
        this.tasks.forEach(task => {
          this.taskForms[task.id] = this.fb.group({
            title: [task.title],
            description: [task.description],
            status: [task.status || 'pending'],
          });
        });
      },
      error: err => console.error('Error loading tasks:', err.message),
    });
  }

  saveTask(taskId: string) {
    const updated = this.taskForms[taskId].value;
    this.apiService.put(`${APIS.tasks}/${taskId}`, updated).subscribe({
      next: res => {
        console.log('Task updated successfully', res);
        //reload tasks
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) this.tasks[index] = { ...this.tasks[index], ...updated };
      },
      error: err => console.error('Failed to update task', err.message),
    });
  }
}
