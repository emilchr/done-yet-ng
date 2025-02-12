import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TodoListService } from '../../service/todo-list.service';

@Component({
  selector: 'app-user-input',
  imports: [ReactiveFormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  todoService = inject(TodoListService);
  private formBuilder = inject(FormBuilder);
  inputForm = this.formBuilder.group({
    userInput: [''],
  });

  onSubmit() {
    // console.log(this.inputForm.value.userInput);
    console.log(this.inputForm.controls['userInput'].value);

    this.todoService.addTodo({
      taskId: Math.floor(Math.random() * 10000),
      // content: this.inputForm.value['userInput'],
      content: this.inputForm.get('userInput'),
      isComplete: false,
    });
    this.inputForm.reset();
  }
}
