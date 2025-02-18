// toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastQueueSubject = new BehaviorSubject<Toast[]>([]);
  toastQueue = this.toastQueueSubject.asObservable(); // Initialize as observable

  enqueue(message: string) {
    const toastObject: Toast = {
      id: Math.floor(Math.random() * 100), // Apply random id to toast
      message: message,
    };

    const currentQueue = this.toastQueueSubject.getValue(); // Get the value from toastQueueSubject
    this.toastQueueSubject.next([toastObject, ...currentQueue]); // Add to the front of the queue
    this.dequeue(toastObject.id); // Dequeue after timeout
  }

  private dequeue(id: number) {
    setTimeout(() => {
      // sets delay for the queue process
      const currentQueue = this.toastQueueSubject.getValue(); // Get the value from toastQueueSubject
      const updatedQueue = currentQueue.filter((toast) => toast.id !== id); // Finds the correct id
      this.toastQueueSubject.next(updatedQueue); // Updates toastQueueSubject with the new toast
    }, 2000);
  }

  showToast(message: string) {
    this.enqueue(message);
  }
}
