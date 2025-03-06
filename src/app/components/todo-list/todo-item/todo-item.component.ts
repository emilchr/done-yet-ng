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
  @Input() id: any;
  @Input() todo: any;
  @Input() isComplete = false;
  @Input() userId: any;

  private formBuilder = inject(FormBuilder);
  todoForm = this.formBuilder.group({
    todoInput: [''],
  });

  ngOnInit(): void {
    // sets the todo value of the input to the todo of the todo.
    this.todoForm.setValue({ todoInput: this.todo });
  }

  handleClick = () => {
    const newStatus: Todo = {
      id: this.id,
      todo: this.todo,
      isComplete: this.isComplete ? false : true, // Chooses the status based on what the previous status was
      userId: this.userId,
    };
    this.todoService.setStatus(newStatus);
  };

  handleEdit(id: number) {
    const currentTodo = this.todoService.getTodo(id); // Retrieves the todo
    if (this.todoForm.value.todoInput) {
      // If there is any value in the input field, assign the new value to newConent.
      const newtodo = this.todoForm.value.todoInput;

      // If the task id is correct pass along the data to the todo service.
      if (currentTodo?.id === id) {
        this.todoService.editTodo(currentTodo, newtodo);
      }
    }
  }
}
