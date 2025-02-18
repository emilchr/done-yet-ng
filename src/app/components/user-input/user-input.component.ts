import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../service/toast.service';
import { TodoData } from '../../service/todo-list.service';

@Component({
  selector: 'app-user-input',
  imports: [ReactiveFormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  toast = inject(ToastService);
  todoService = inject(TodoData);
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
      this.toast.showToast('Todo created!', 'correct');
    } else {
      this.toast.showToast('Not created', 'error');
    }
  }
}
