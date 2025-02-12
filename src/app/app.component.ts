import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { Todo } from './components/todo-list/todo.interface';
import { UserInputComponent } from './components/user-input/user-input.component';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent, UserInputComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  todos: Todo[] = [
    {
      taskId: 0,
      content: 'Removing the wet weather',
      isComplete: false,
    },
    {
      taskId: 1,
      content: 'Adding soap to the rain',
      isComplete: false,
    },
    {
      taskId: 2,
      content: 'Closing down shop',
      isComplete: false,
    },
    {
      taskId: 3,
      content: 'Marking a todo as done',
      isComplete: true,
    },
    {
      taskId: 4,
      content: 'Fill up editor',
      isComplete: false,
    },
    {
      taskId: 5,
      content: 'Celebrate your victory',
      isComplete: true,
    },
    {
      taskId: 42,
      content: 'Total and utter destruction of Pluto',
      isComplete: true,
    },
    {
      taskId: 1337,
      content: 'Make someone say my name',
      isComplete: false,
    },
  ];
  getTodo(todo: Todo) {
    this.todos.push(todo);
  }
  setStatus(newTodo: Todo) {
    console.log(newTodo);
    const todoIndex = this.todos.findIndex(
      (todo) => todo.taskId === newTodo.taskId
    );
    console.log(todoIndex);
    this.todos[todoIndex].isComplete = newTodo.isComplete;
  }
}
