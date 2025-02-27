import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../service/toast.service';
import { TodoService } from '../../service/todo-list.service';

@Component({
  selector: 'app-user-input',
  imports: [ReactiveFormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  toasting = inject(ToastService);
  todoService = inject(TodoService);
  private formBuilder = inject(FormBuilder);
  inputForm = this.formBuilder.group({
    userInput: [''],
  });

  onSubmit() {
    // console.log(this.inputForm.value.userInput);
    // console.log(typeof this.inputForm.get('userInput')?.value);
    if (this.inputForm.value.userInput) {
      this.todoService.addTodo({
        taskId: Math.floor(Math.random() * 10000),

        content: this.inputForm.value.userInput,
        isComplete: false,
      });
      this.inputForm.reset();
    } else {
      this.toasting.showToast('Not created', 'error');
    }
  }
}
