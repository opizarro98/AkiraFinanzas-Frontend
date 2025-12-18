import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private modalStateSubject = new BehaviorSubject<{ [key: string]: any }>({
        success: { isOpen: false, message: '' },
        error: { isOpen: false, message: '' },
        info: { isOpen: false, message: '' },
        warning: { isOpen: false, message: '' },
    });

    modalState$ = this.modalStateSubject.asObservable();

    constructor() { }

    openModal(type: 'success' | 'error' | 'info' | 'warning', message: string) {
        this.modalStateSubject.next({
            ...this.modalStateSubject.value,
            [type]: { isOpen: true, message },
        });
    }

    closeModal(type: 'success' | 'error' | 'info' | 'warning') {
        this.modalStateSubject.next({
            ...this.modalStateSubject.value,
            [type]: { isOpen: false, message: '' },
        });
    }
}
