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
  setStatus;

  constructor(todos: TodoData) {
    this.todos = todos.getTodos();
    this.setStatus = todos.setStatus;
    // console.log(this.todos);
  }

  showCompleted = true;
  show = 'show';
  todoCompleted = 'todoCompleted';

  handleShow() {
    if (!this.showCompleted) {
      this.show = 'show';
      this.todoCompleted = 'todoCompleted';
      this.showCompleted = true;
    } else {
      this.show = 'show hide';
      this.todoCompleted = 'conceal';
      this.showCompleted = false;
    }
  }

  currentTodo: any;

  onDrag(todo: Todo) {
    this.currentTodo = todo;
  }
  onDrop($event: any, todo: Todo) {
    const newStatus = {
      taskId: todo.taskId,
      content: todo.content,
      isComplete: todo.isComplete ? false : true,
    };
    this.setStatus(newStatus);
  }

  onDragOver($event: any) {
    $event.preventDefault();
  }
}
