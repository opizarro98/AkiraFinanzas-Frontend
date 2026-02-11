import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { LabelComponent } from '../../form/label/label.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { PersonService } from '../../../services/person/person.service';
import { BasicPersonalDataResponseDTO } from '../../../models/person/BasicPersonalDataResponseDTO';

@Component({
  selector: 'app-user-personal-info-card',
  imports: [
    CommonModule,
    InputFieldComponent,
    ButtonComponent,
    LabelComponent,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-personal-info-card.component.html',
  styles: ``
})
export class UserPersonalInfoCardComponent {

  personalDataForm!: FormGroup;
  personalInfo!: BasicPersonalDataResponseDTO;
  isOpenModal = false;


  constructor(public modal: ModalService, private fb: FormBuilder, private notificationService: NotificationService, private personService: PersonService) {
    this.personalDataForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      secondLastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPersonalData();
  }

  loadPersonalData() {
    this.personService.getPersonalData().subscribe({
      next: (response) => {
        this.personalInfo = response;
      },
      error: (error) => {
        this.notificationService.show('error', 'Error', 'Servicio no disponible, intente mas tarde.');
      }
    });
  }


  openModal(personalData: BasicPersonalDataResponseDTO) {
    this.isOpenModal = true;
    this.personalDataForm.patchValue({
      firstName: personalData.firstName,
      middleName: personalData.middleName,
      lastName: personalData.lastName,
      secondLastName: personalData.secondLastName,
      email: personalData.email,
      phone: personalData.phone
    });
  }
  closeModal() { this.isOpenModal = false; }


  saveData() {
    if (this.personalDataForm.invalid) {
      this.notificationService.show('error', 'Error', 'Por favor, completa todos los campos requeridos');
      return;
    }
    const formData = this.personalDataForm.value;
    this.personService.updatePersonalData(formData).subscribe({
      next: () => {
        this.notificationService.show('success', 'Actualizacion correcta', 'Se ha actiualizado corrextamente los datos.');
        this.loadPersonalData();
        this.closeModal();
        this.personalDataForm.reset();
      },
      error: () => {
        this.notificationService.show('error', 'Error', 'Error al actualziar los datos personales.');
      }
    });
    this.modal.closeModal();
  }
}
