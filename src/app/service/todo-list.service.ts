import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../components/todo-list/todo.interface';
import { ToastService } from './toast.service';
@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  getData(): Observable<any> {
    this.http
      .get<{ todos: Todo[] }>('https://dummyjson.com/todos')
      .subscribe((result) => {
        this.data = new BehaviorSubject(result.todos);
      });

    return this.data;
  }
  data: any;

  toastService = inject(ToastService);

  todos = new BehaviorSubject<Todo[]>([
    {
      id: 0,
      todo: 'Removing the wet weather',
      isComplete: false,
      userId: 1,
    },
    {
      id: 1,
      todo: 'Adding soap to the rain',
      isComplete: false,
      userId: 1,
    },
    {
      id: 2,
      todo: 'Closing down shop',
      isComplete: false,
      userId: 1,
    },
    {
      id: 3,
      todo: 'Marking a todo as done',
      isComplete: true,
      userId: 1,
    },
    {
      id: 4,
      todo: 'Fill up editor',
      isComplete: false,
      userId: 1,
    },
    {
      id: 5,
      todo: 'Celebrate your victory',
      isComplete: true,
      userId: 1,
    },
    {
      id: 42,
      todo: 'Total and utter destruction of Pluto',
      isComplete: true,
      userId: 1,
    },
    {
      id: 1337,
      todo: 'Make someone say my name',
      isComplete: false,
      userId: 1,
    },
    {
      id: 1306,
      todo: 'Making the checkbox work',
      isComplete: true,
      userId: 1,
    },
    {
      id: 1202,
      todo: 'Adding toasts with a service',
      isComplete: false,
      userId: 1,
    },
    {
      id: 1201,
      todo: 'Forcing the input to post todo',
      isComplete: true,
      userId: 1,
    },
    {
      id: 1203,
      todo: 'Add functionality to the show/hide button',
      isComplete: false,
      userId: 1,
    },
  ]);

  // Returns the whole todo list
  getTodos() {
    return this.todos.getValue();
  }

  // Returns a spesific todo
  getTodo(id: number) {
    const todos = this.todos.getValue();

    return todos.find((todo) => id === todo.id);
  }

  // Adds todo to the list and toasts
  addTodo(newTodo: Todo) {
    const originalArray = this.todos.getValue();
    const newArray = [...originalArray, newTodo];
    this.todos.next(newArray); // Updates old array, with new todo.

    this.toastService.showToast('Todo created!', 'correct');
  }

  // Edit todo
  editTodo(currentTodo: Todo, newtodo: string) {
    const todos = this.getTodos();

    const updatedArray = todos.map((todo) => {
      // If the id is correct, edit the todo.
      if (todo.id === currentTodo.id) {
        return { ...todo, todo: newtodo };
      }
      // Return the updated todo.
      return todo;
    });
    // Markes todo status to true (completed) or false (not completed) and sends the new updated array to the behaviorSubject this.todos.
    this.todos.next(updatedArray);
  }
  // Stores new index of the todo, if it has been rearranged. Otherwise undefined.
  newIndex: any;

  // Reorder todo
  reorderTodo = (fromId: number, toId: number) => {
    let todos = this.getTodos();
    const fromTodoId = this.getTodo(fromId)?.id;
    const toTodoId = this.getTodo(toId)?.id;
    const fromIndex = todos.findIndex((todo) => todo.id === fromTodoId);
    const toIndex = todos.findIndex((todo) => todo.id === toTodoId);

    const tempTodo = todos[fromIndex];
    todos[fromIndex] = todos[toIndex];
    todos[toIndex] = tempTodo;

    // Sets newIndex to the new index that was given.
    this.newIndex = toIndex;
  };

  setStatus(currentTodo: Todo) {
    // Sets the old and new index in the list
    const todos = this.getTodos();
    const oldTodo = this.getTodo(currentTodo.id); // retrieves the old Todo
    const oldIndex = todos.findIndex((todo: Todo) => todo.id === oldTodo?.id); // Sets the index of the old todo.

    // Checks if the todo has been reordered and if the status is the same.
    if (
      oldIndex !== this.newIndex &&
      currentTodo.isComplete == oldTodo?.isComplete
    ) {
      this.toastService.showToast('Rearranged!', 'correct');
    } else if (currentTodo.isComplete == oldTodo?.isComplete) {
      // Checks if the new status and the old status is similar.
      this.toastService.showToast('No change', 'alert');
    } else {
      // Displays toast based on status.
      currentTodo.isComplete
        ? this.toastService.showToast('Todo done!', 'correct')
        : this.toastService.showToast('Marked as undone', 'alert');
    }

    const newArray = todos.map((todo) => {
      if (todo.id === currentTodo.id) {
        return { ...todo, isComplete: currentTodo.isComplete };
      }
      return todo;
    });
    // Markes todo status to true (completed) or false (not completed) and sends the new updated array to the behaviorSubject this.todos.
    this.todos.next(newArray);
  }
}
