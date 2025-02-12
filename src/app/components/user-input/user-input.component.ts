import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../todo-list/todo.interface';

@Component({
  selector: 'app-user-input',
  imports: [ReactiveFormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  @Output() postTodo = new EventEmitter<Todo>();

  private formBuilder = inject(FormBuilder);
  inputForm = this.formBuilder.group({
    userInput: [''],
  });

  addTodo(todo: any) {
    const currentTodo = {
      taskId: Math.floor(Math.random() * 10000),
      content: todo,
      isComplete: false,
    };
    this.postTodo.emit(currentTodo);
    // console.log(currentTodo);
  }

  onSubmit() {
    this.addTodo(this.inputForm.value.userInput);

    this.inputForm.reset();
  }
}
