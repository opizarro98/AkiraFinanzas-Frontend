import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-confirm-modal',
  imports: [
    CommonModule,
    ButtonComponent,
    ModalComponent,
  ],
  template: `
    <app-modal [isOpen]="isOpen" (close)="cancel()" className="max-w-[400px] m-4">
      <div class="p-6 text-center">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ title }}</h3>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ message }}</p>
        <div class="mt-6 flex justify-center gap-3">
          <app-button size="sm" variant="outline" (btnClick)="cancel()">Cancelar</app-button>
          <app-button size="sm" variant="danger" (btnClick)="confirm()">Confirmar</app-button>
        </div>
      </div>
    </app-modal>
  `,
  styles: ``
})
export class ConfirmModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Confirmar acción';
  @Input() message: string = '¿Estás seguro?';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm() {
    this.confirmed.emit();
    this.isOpen = false;
  }

  cancel() {
    this.cancelled.emit();
    this.isOpen = false;
  }
}
