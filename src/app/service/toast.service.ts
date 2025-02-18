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
  // toastObservable = new BehaviorSubject('');

  toastQueue: Toast[] = [];
  enqueue = (message: string) => {
    const toastObject = {
      id: Math.floor(Math.random() * 100),
      message: message,
    };
    this.toastQueue.unshift(toastObject);
  };
  dequeue() {
    setTimeout(() => {
      // this.toastObservable.next(this.toastQueue[0].message);
      this.toastQueue.pop();
    }, 3000);
  }

  showToast(message: string) {
    this.enqueue(message);

    if (this.toastQueue.length > 0) {
      this.dequeue();
    }
  }
}
