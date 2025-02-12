import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
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
  @Input() todos: Todo[] = [];
  @Output() newStatus = new EventEmitter<Todo>();
  getStatus(newStatus: Todo) {
    // console.log(newStatus);
    this.newStatus.emit(newStatus);
  }
}
