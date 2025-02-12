import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { TodoListService } from '../../../service/todo-list.service';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TodoItemComponent {
  @Input() taskId = 0;
  @Input() content = '';
  @Input() isComplete = false;

  todoService = inject(TodoListService);

  handleClick = () => {
    const newTodo = {
      taskId: this.taskId,
      content: this.content,
      isComplete: this.isComplete ? false : true,
    };
    this.todoService.setStatus(newTodo);
  };
}
