import { Component, inject, Input, ViewEncapsulation } from '@angular/core';

import { TodoService } from '../../../service/todo-list.service';
import { Todo } from '../todo.interface';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TodoItemComponent {
  todoService = inject(TodoService);
  @Input() taskId = 0;
  @Input() content = '';
  @Input() isComplete = false;

  handleClick = () => {
    const newStatus: Todo = {
      taskId: this.taskId,
      content: this.content,
      isComplete: this.isComplete ? false : true,
    };
    this.todoService.setStatus(newStatus);
  };

  handleEdit(todo: Todo, newValue: string) {
    const newTodo: Todo = {
      ...todo,
      content: newValue,
    };
    this.todoService.editTodo(newTodo);
  }
}
