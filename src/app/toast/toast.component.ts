import { Component, OnInit } from '@angular/core';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent implements OnInit {
  constructor(private toastService: ToastService) {}
  toastDisplay: string = 'Toast component';
  ngOnInit() {
    this.toastService.toastObservable.subscribe((toast: string) => {
      this.toastDisplay = toast;
    });
  }
}
