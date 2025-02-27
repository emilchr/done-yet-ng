import { inject, Injectable } from '@angular/core';
import { Todo } from '../components/todo-list/todo.interface';
import { ToastService } from './toast.service';
@Injectable({
  providedIn: 'root',
})
export class TodoData {
  toasting = inject(ToastService);
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
    this.toasting.showToast('Todo created!', 'correct');
  }

  newIndex: any;

  reorderTodo = (fromId: number, toId: number) => {
    let todos = this.getTodos();
    const fromTodoId = this.getTodo(fromId)?.taskId;
    const toTodoId = this.getTodo(toId)?.taskId;
    const fromIndex = todos.findIndex((todo) => todo.taskId === fromTodoId);
    const toIndex = todos.findIndex((todo) => todo.taskId === toTodoId);

    const tempTodo = todos[fromIndex];
    todos[fromIndex] = todos[toIndex];
    todos[toIndex] = tempTodo;
    this.newIndex = toIndex;
  };

  setStatus(currentTodo: Todo) {
    const oldTodo = this.getTodo(currentTodo.taskId);
    const oldIndex = this.todos.findIndex(
      (todo: Todo) => todo.taskId === oldTodo?.taskId
    );

    console.log(`Old ${oldIndex} and new ${this.newIndex}`);
    // Checks if the todo has been reordered and if the status is the same.
    if (
      oldIndex !== this.newIndex &&
      currentTodo.isComplete == oldTodo?.isComplete
    ) {
      this.toasting.showToast('Rearranging!', 'correct');
    } else if (currentTodo.isComplete == oldTodo?.isComplete) {
      // Checks if the new status and the old status is similar.
      this.toasting.showToast('No change', 'alert');
    } else {
      currentTodo.isComplete
        ? this.toasting.showToast('Todo done!', 'correct')
        : this.toasting.showToast('Marked as undone', 'alert');
    }

    const todoIndex = this.todos.findIndex(
      (todo) => todo.taskId === currentTodo.taskId
    );
    this.todos[todoIndex].isComplete = currentTodo.isComplete;
  }
}
