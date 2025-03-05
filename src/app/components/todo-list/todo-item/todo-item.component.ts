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
    // sets the content value of the input to the content of the todo.
    this.contentForm.setValue({ contentInput: this.content });
  }

  handleClick = () => {
    const newStatus: Todo = {
      taskId: this.taskId,
      content: this.content,
      isComplete: this.isComplete ? false : true, // Chooses the status based on what the previous status was
    };
    this.todoService.setStatus(newStatus);
  };

  handleEdit(taskId: number) {
    const currentTodo = this.todoService.getTodo(taskId); // Retrieves the todo
    if (this.contentForm.value.contentInput) {
      // If there is any value in the input field, assign the new value to newConent.
      const newContent = this.contentForm.value.contentInput;

      // If the task id is correct pass along the data to the todo service.
      if (currentTodo?.taskId === taskId) {
        this.todoService.editTodo(currentTodo, newContent);
      }
    }
  }
}
