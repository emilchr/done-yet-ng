import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { Todo } from './components/todo-list/todo.interface';
import { UserInputComponent } from './components/user-input/user-input.component';
import { todoInterceptor } from './interceptor/todo.interceptor';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent, UserInputComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
})
export class AppComponent {
  todos: Todo[] = [];
}
