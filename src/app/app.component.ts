import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { Todo } from './components/todo-list/todo.interface';
import { UserInputComponent } from './components/user-input/user-input.component';
import { TodoData } from './service/todo-list.service';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent, UserInputComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  todos: Todo[] = [];
  todoReorder;

  constructor(todos: TodoData) {
    this.todos = todos.getTodos();
    // console.log(this.todos);
    this.todoReorder = todos.reorderTodo;
  }
  reorderTest() {
    this.todoReorder(1201, 1);
  }
}
