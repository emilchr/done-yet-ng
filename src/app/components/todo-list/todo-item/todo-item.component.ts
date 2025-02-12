import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Todo } from '../todo.interface';

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
  @Output() newStatus = new EventEmitter<Todo>();
  handleClick = () => {
    const newTodo = {
      taskId: this.taskId,
      content: this.content,
      isComplete: this.isComplete ? false : true,
    };
    this.newStatus.emit(newTodo);
    // console.log(newTodo);
  };
}
