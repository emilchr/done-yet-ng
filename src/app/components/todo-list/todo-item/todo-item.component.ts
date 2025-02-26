import { Component, inject, Input, ViewEncapsulation } from '@angular/core';

import { TodoData } from '../../../service/todo-list.service';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TodoItemComponent {
  todoService = inject(TodoData);
  @Input() taskId = 0;
  @Input() content = '';
  @Input() isComplete = false;

  handleClick = () => {
    const newStatus = {
      taskId: this.taskId,
      content: this.content,
      isComplete: this.isComplete ? false : true,
    };
    this.todoService.setStatus(newStatus);
  };
}
