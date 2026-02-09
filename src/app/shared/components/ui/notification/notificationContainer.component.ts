import { Component } from '@angular/core';
import { AppNotification, NotificationService } from '../../../services/notification.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
  ],
  template: `
    <div class="notification-container">
      <app-alert
        *ngFor="let n of notifications"
        [variant]="n.variant"
        [title]="n.title"
        [message]="n.message"
        (click)="dismiss(n.id)">
      </app-alert>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `]
})
export class NotificationContainerComponent {
  notifications: AppNotification[] = [];

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  dismiss(id: number) {
    this.notificationService.remove(id);
  }
}