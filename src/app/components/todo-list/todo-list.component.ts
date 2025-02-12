import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { TodoData } from '../../service/todo-list.service';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TodoListComponent {
  todos: Todo[] = [];

  constructor(todos: TodoData) {
    this.todos = todos.getTodos();
    // console.log(this.todos);
  }
}
