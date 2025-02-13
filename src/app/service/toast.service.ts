import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  currentToast: string[] = [];
  toastHistory: string[] = [];

  enque(toast: string) {
    if (this.currentToast.length > 0) {
      this.dequeue();
    }
    this.currentToast.push(toast);
  }
  dequeue() {
    if (!this.currentToast.length) {
      if (!this.toastHistory.length) {
        console.log('Queue empty');
        return null;
      }
    }
    return this.currentToast.pop();
  }
  // toastType = {
  //   add: 'New todo added!',
  //   remove: 'Undone!',
  //   complete: 'Completed!',
  // };

  showToast(message: any) {
    const toastTimeout = setTimeout(() => {
      this.dequeue();
    }, 1500);

    this.enque(message);
    // this.currentToast.push(message);
    // console.log(message);
    this.toastHistory.unshift(message);
    //
    // if (this.toastHistory.length > 0) {
    //   clearTimeout(toastTimeout);

    //   setTimeout(() => {
    //     this.dequeue();
    //   }, 1500);
    // }
    toastTimeout;

    console.log('currentToast: ' + this.currentToast);
    console.log('toastHistory: ' + this.toastHistory);
  }
}
