import {
  Component,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
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
  private formBuilder = inject(FormBuilder);
  contentForm = this.formBuilder.group({
    contentInput: [''],
  });

  ngOnInit(): void {
    // console.log(this.content);
    // this.contentInput.setValue(this.content);
    this.contentForm.setValue({ contentInput: this.content });
  }

  handleClick = () => {
    const newStatus: Todo = {
      taskId: this.taskId,
      content: this.content,
      isComplete: this.isComplete ? false : true,
    };
    this.todoService.setStatus(newStatus);
  };

  handleEdit(taskId: number) {
    const currentTodo = this.todoService.getTodo(taskId);
    if (this.contentForm.value.contentInput) {
      const newContent = this.contentForm.value.contentInput;

      // console.log(this.contentInput.value);

      if (currentTodo?.taskId === taskId) {
        this.todoService.editTodo(currentTodo, newContent);
      }
    }
  }
}
