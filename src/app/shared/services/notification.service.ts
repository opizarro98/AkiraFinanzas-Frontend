import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

// notification.service.ts
export interface AppNotification {
    id: number;
    variant: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
    notifications$ = this.notificationsSubject.asObservable();

    private idCounter = 0;

    show(variant: 'success' | 'error' | 'warning' | 'info', title: string, message: string, duration = 3000) {
        const id = ++this.idCounter;
        const notification: AppNotification = { id, variant, title, message };

        const current = this.notificationsSubject.getValue();
        this.notificationsSubject.next([...current, notification]);

        setTimeout(() => this.remove(id), duration);
    }

    remove(id: number) {
        const current = this.notificationsSubject.getValue();
        this.notificationsSubject.next(current.filter(n => n.id !== id));
    }
}
