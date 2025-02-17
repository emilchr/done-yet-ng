import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { ToastService } from './service/toast.service';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [
    TodoListComponent,
    UserInputComponent,
    NgOptimizedImage,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
