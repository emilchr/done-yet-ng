import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TodoService } from '../../service/todo-list.service';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  todoService;
  constructor(todoService: TodoService) {
    // this.todos = todos.getTodos();
    this.todoService = todoService; // Binds the service to this.todoService.
    // console.log(this.todos);
  }

  ngOnInit(): void {
    // Gets the todo list from todo service
    this.todoService.todos.subscribe((todos) => {
      return (this.todos = todos);
    });
    this.todoService.getData();
  }

  showCompleted = true;
  show = 'show';
  todoCompleted = 'todoCompleted';

  // Handles the show and hide feature for completed todos.
  handleShow() {
    console.log(this.todoService.data.getValue());
    if (!this.showCompleted) {
      this.show = 'show';
      this.todoCompleted = 'todoCompleted';
      this.showCompleted = true;
    } else {
      this.show = 'show hide';
      this.todoCompleted = 'conceal';
      this.showCompleted = false;
    }
  }

  currentTodo: any;
  rearrangeTodo: any;

  // Creates a ghost element for dragging-style.
  onStart(event: DragEvent, todo: Todo) {
    this.currentTodo = todo;
    const cloneDiv = document.createElement('div');
    const span = document.createElement('span');
    cloneDiv.innerHTML = `<span>${todo.todo}</span><input name="checkbox" type="checkbox" ${todo.isComplete ? 'checked="true"' : ''}/> <label for="checkbox"></label>`;

    cloneDiv.className = 'todo';
    todo.isComplete && cloneDiv.classList.add('todoComplete');
    cloneDiv.id = 'dragging';

    document.body.appendChild(cloneDiv).appendChild(span);

    // Executes only if user is on a device with width larger than 1024px. setDragImage is not supported on mobile devices.
    if (window.innerWidth > 1024) {
      event.dataTransfer?.setDragImage(cloneDiv, 50, 20);
    }
  }

  // Sets currentTodo to the todo thats being dragged.
  onDrag(event: DragEvent, todo: Todo) {
    event.preventDefault();
    this.currentTodo = todo;
  }

  // Sets a new status for the todo thats being dropped.
  onDrop(event: DragEvent, todo: Todo, status: boolean) {
    event.preventDefault();

    const newStatus: Todo = {
      id: todo.id,
      todo: todo.todo,
      isComplete: status,
      userId: todo.userId,
    };
    this.todoService.setStatus(newStatus);
  }
  // Prevents default behavior.
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Removes ghost image-element when dragging stops.
  onDragEnd(event: DragEvent) {
    event.preventDefault();
    const cloneDiv = document.getElementById('dragging') as Element;
    document.body.removeChild(cloneDiv);
  }

  // Rearranges todo with same status.
  reArrangeDrop(event: Event, todo: Todo) {
    this.todoService.reorderTodo(todo.id, this.rearrangeTodo.id);
    // console.log(`Rearranging ${todo.id} with ${this.rearrangeTodo.id}`);
  }

  // Sets rearrangeTodo to the todo thats being rearranged.
  onMouseEnter(event: Event, todo: Todo) {
    this.rearrangeTodo = todo;
    // console.log(todo.id);
  }
}
