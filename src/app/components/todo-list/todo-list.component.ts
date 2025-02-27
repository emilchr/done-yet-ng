import { Component, ViewEncapsulation } from '@angular/core';
import { TodoData } from '../../service/todo-list.service';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TodoListComponent {
  todos: Todo[] = [];
  todoData;

  constructor(todos: TodoData) {
    this.todos = todos.getTodos(); // Gets the todo list from todo service
    this.todoData = todos; // Binds the service to this.todoData.
    // console.log(this.todos);
  }

  showCompleted = true;
  show = 'show';
  todoCompleted = 'todoCompleted';

  // Handles the show and hide feature for completed todos.
  handleShow() {
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
    cloneDiv.innerHTML = `<span>${todo.content}</span><input name="checkbox" type="checkbox" ${todo.isComplete ? 'checked="true"' : ''}/> <label for="checkbox"></label>`;

    cloneDiv.className = 'todo';
    todo.isComplete && cloneDiv.classList.add('todoComplete');
    cloneDiv.id = 'dragging';

    document.body.appendChild(cloneDiv).appendChild(span);

    // Executes only if user is on a device with width larger than 1024px. setDragImage is not supported on mobile devices.
    if (window.innerWidth > 1024) {
      event.dataTransfer?.setDragImage(cloneDiv, 0, 0);
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
      taskId: todo.taskId,
      content: todo.content,
      isComplete: status,
    };
    this.todoData.setStatus(newStatus);
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
    this.todoData.reorderTodo(todo.taskId, this.rearrangeTodo.taskId);
    // console.log(`Rearranging ${todo.taskId} with ${this.rearrangeTodo.taskId}`);
  }

  // Sets rearrangeTodo to the todo thats being rearranged.
  onMouseEnter(event: Event, todo: Todo) {
    this.rearrangeTodo = todo;
  }
}
