import { Component } from '@angular/core';
import { InputFieldComponent } from './../../form/input/input-field.component';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../ui/modal/modal.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { PersonService } from '../../../services/person/person.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-user-meta-card',
  imports: [
    CommonModule,
  ],
  templateUrl: './user-meta-card.component.html',
  styles: ``
})
export class UserMetaCardComponent {

  firstName!: string;
  lastName !: string;

  constructor(public modal: ModalService, private personService: PersonService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadName();
  }

  loadName() {
    this.personService.getPersonalData().subscribe({
      next: (response) => {
        this.firstName = response.firstName;
        this.lastName = response.lastName;
      },
      error: () => {
        this.notificationService.show('error', 'Error', 'Servicio no disponible, intente mas tarde.');
      }
    });
  }

  // Example user data (could be made dynamic)
  user = {
    avatar: '/images/user/generic-user-top.jpg',
  };
}
