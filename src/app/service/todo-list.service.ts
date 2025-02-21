import { Injectable } from '@angular/core';
import { Todo } from '../components/todo-list/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoData {
  private todos: Todo[] = [
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
    {
      taskId: 1306,
      content: 'Making the checkbox work',
      isComplete: true,
    },
    {
      taskId: 1202,
      content: 'Adding toasts with a service',
      isComplete: false,
    },
    {
      taskId: 1201,
      content: 'Forcing the input to post content',
      isComplete: true,
    },
    {
      taskId: 1203,
      content: 'Add functionality to the show/hide button',
      isComplete: false,
    },
  ];
  getTodos() {
    return this.todos;
  }

  getTodo(taskId: number) {
    return this.todos.find((todo) => taskId === todo.taskId);
  }

  addTodo(newTodo: Todo) {
    this.todos.push(newTodo);
  }

  reorderTodo = (fromId: number, toId: number) => {
    let todos = this.getTodos();
    const fromTodoId = this.getTodo(fromId)?.taskId;
    const toTodoId = this.getTodo(toId)?.taskId;
    const fromIndex = todos.findIndex((todo) => todo.taskId === fromTodoId);
    const toIndex = todos.findIndex((todo) => todo.taskId === toTodoId);
    console.log(`From id: ${fromTodoId} with index ${fromIndex}`);
    console.log(`To id: ${toTodoId} with index ${toIndex}`);

    const tempTodo = todos[fromIndex];
    todos[fromIndex] = todos[toIndex];
    todos[toIndex] = tempTodo;
  };

  setStatus(currentTodo: Todo) {
    // console.log(currentTodo);
    const todoIndex = this.todos.findIndex(
      (todo) => todo.taskId === currentTodo.taskId
    );
    this.todos[todoIndex].isComplete = currentTodo.isComplete;
  }
}
