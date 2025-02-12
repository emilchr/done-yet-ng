import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  currentToast: string[] = [];
  showToast(message: any) {
    this.currentToast.pop();
    console.log(message);

    this.currentToast.push(message);
    setTimeout(() => {
      this.currentToast.pop();
    }, 3000);
  }
}
