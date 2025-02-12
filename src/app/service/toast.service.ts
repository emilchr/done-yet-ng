import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  currentToast: string[] = [];
  toastHistory: string[] = [];
  showToast(message: any) {
    this.currentToast.pop();
    console.log(message);
    // Make a queue?
    this.currentToast.push(message);
    this.toastHistory.push(message);
    setTimeout(() => {
      this.currentToast.pop();
    }, 3000);
  }
}
