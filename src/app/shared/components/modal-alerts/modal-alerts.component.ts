import { Component } from '@angular/core';
import { ModalComponent } from '../ui/modal/modal.component';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-modal-alerts',
  imports: [
    ModalComponent,
  ],
  templateUrl: './modal-alerts.component.html',
  styles: ``
})
export class ModalAlertsComponent {

  successModal = false;
  errorModal = false;
  infoModal = false;
  warningModal = false;
  messageModal = '';

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.modalState$.subscribe((modalState) => {
      this.successModal = modalState['success'].isOpen;
      this.errorModal = modalState['error'].isOpen;
      this.infoModal = modalState['info'].isOpen;
      this.warningModal = modalState['warning'].isOpen;
      this.messageModal = modalState['success'].message || modalState['error'].message || modalState['info'].message || modalState['warning'].message;
    });
  }


  handleCloseModal(modal: 'success' | 'error' | 'info' | 'warning') {
    this.alertService.closeModal(modal);
  }
}
