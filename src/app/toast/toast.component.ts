import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Toast, ToastService } from '../service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  imports: [],
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit, OnDestroy {
  toastQueue: Toast[] = []; // Correct type
  private toastSubscription: Subscription | undefined;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    // Subscribes to the observable data stream
    this.toastSubscription = this.toastService.toastQueue.subscribe((queue) => {
      this.toastQueue = queue;
    });
  }

  ngOnDestroy() {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe(); // Unsubscribe to avoid memory leak
    }
  }
}
