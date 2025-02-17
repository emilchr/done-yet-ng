import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastObservable = new BehaviorSubject('');

  toastQueue: string[] = [];
  enqueue = (message: string) => {
    this.toastQueue.push(message);
  };
  dequeue() {
    this.toastQueue.map((toast) => {
      return console.log('IN QUEUE' + toast);
    });
  }

  showToast(message: string) {
    const trigger = setTimeout(() => {
      this.toastObservable.next('');
    }, 3000);

    if (this.toastObservable.getValue()) {
      console.log('Already toasting');
      this.enqueue(message);
      // setInterval(() => {
      //   this.toastObservable.next(message);
      // }, 3000);
    }
    this.dequeue;

    this.toastObservable.next(message);
    trigger;

    console.log(this.toastQueue);
  }
}
