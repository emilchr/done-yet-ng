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
    this.todos = todos.getTodos();
    this.todoData = todos;
    // console.log(this.todos);
  }

  showCompleted = true;
  show = 'show';
  todoCompleted = 'todoCompleted';

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

  onStart(event: DragEvent, todo: Todo) {
    this.currentTodo = todo;
    const cloneDiv = document.createElement('div');
    const span = document.createElement('span');
    cloneDiv.innerHTML = `<span>${todo.content}</span><input name="checkbox" type="checkbox" ${todo.isComplete ? 'checked="true"' : ''}/> <label for="checkbox"></label>`;

    cloneDiv.className = 'todo';
    todo.isComplete && cloneDiv.classList.add('todoComplete');
    cloneDiv.id = 'dragging';

    document.body.appendChild(cloneDiv).appendChild(span);

    if (window.innerWidth > 1024) {
      // Runs only if user is on a desktop. setDragImage is not supported on mobile devices.
      event.dataTransfer?.setDragImage(cloneDiv, 0, 0);
    }
  }

  onDrag(event: DragEvent, todo: Todo) {
    event.preventDefault();
    this.currentTodo = todo;
  }
  onDrop(event: DragEvent, todo: Todo, status: boolean) {
    event.preventDefault();

    const newStatus: Todo = {
      taskId: todo.taskId,
      content: todo.content,
      isComplete: status,
    };
    this.todoData.setStatus(newStatus);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragEnd(event: DragEvent) {
    event.preventDefault();
    const cloneDiv = document.getElementById('dragging') as Element;
    document.body.removeChild(cloneDiv);
  }
  reArrangeDrop(event: Event, todo: Todo) {
    this.todoData.reorderTodo(todo.taskId, this.rearrangeTodo.taskId);
    console.log(`Rearranging ${todo.taskId} with ${this.rearrangeTodo.taskId}`);
  }
  onMouseEnter(event: Event, todo: Todo) {
    this.rearrangeTodo = todo;
  }
}
