import {
  Component,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../../service/todo-list.service';
import { Todo } from '../todo.interface';

@Component({
  selector: 'app-todo-item',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TodoItemComponent implements OnInit {
  todoService = inject(TodoService);
  @Input() taskId: any;
  @Input() content: any;
  @Input() isComplete = false;

  ngOnInit(): void {
    // console.log(this.content);
    this.contentForm.setValue(this.content);
  }

  handleClick = () => {
    const newStatus: Todo = {
      taskId: this.taskId,
      content: this.content,
      isComplete: this.isComplete ? false : true,
    };
    this.todoService.setStatus(newStatus);
  };

  contentForm = new FormControl('');

  handleEdit(taskId: number, newValue: string) {
    this.todoService.editTodo(taskId, newValue);
  }
}
