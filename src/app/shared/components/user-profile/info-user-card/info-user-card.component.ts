import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { LabelComponent } from '../../form/label/label.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { PersonService } from '../../../services/Person/Person.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetPersonCompleteDTO } from '../../../model/Person/GerPersonCompleteDTO';
import { ModalAlertsComponent } from '../../modal-alerts/modal-alerts.component';
import { InputFieldAKFComponent } from '../../form/input/input-field-akf.component';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-info-user-card',
  imports: [
    CommonModule,
    InputFieldAKFComponent,
    ButtonComponent,
    ModalAlertsComponent,
    ModalComponent,
    LabelComponent,
    ModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './info-user-card.component.html',
  standalone: true,
  styles: ``
})
export class InfoUserCardComponent {

  constructor(
    public modal: ModalService,
    public personService: PersonService,
    private alertService: AlertService,
  ) { }

  formPerson = new FormGroup
    ({
      personId: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl(''),
      secondLastName: new FormControl(''),
      email: new FormControl('', Validators.email),
      phone: new FormControl(''),
    });

  GetPersonInit?: GetPersonCompleteDTO;

  ngOnInit(): void {
    this.loadUserData();
  }





  isOpenEdit = false;
  openModal() {
    this.isOpenEdit = true;
    this.loadUserData();
  }
  closeModalEdit() { this.isOpenEdit = false; }




  loadUserData() {
    this.personService.getPersonCompleteById('1')
      .subscribe((person: GetPersonCompleteDTO) => {
        this.GetPersonInit = person;

        this.formPerson.patchValue({
          personId: person.personId,
          firstName: person.firstName,
          middleName: person.middleName,
          lastName: person.lastName,
          secondLastName: person.secondLastName,
          email: person.email,
          phone: person.phone
        });
      });
  }


  updateUser() {
    if (this.formPerson.valid) {
      const updatedPerson: GetPersonCompleteDTO = {
        personId: this.GetPersonInit?.personId || '',
        firstName: this.formPerson.value.firstName || '',
        middleName: this.formPerson.value.middleName || '',
        lastName: this.formPerson.value.lastName || '',
        secondLastName: this.formPerson.value.secondLastName || '',
        email: this.formPerson.value.email || '',
        phone: this.formPerson.value.phone || '',
      }
      this.personService.updatePerson(updatedPerson).subscribe(
        (response) => {
          this.closeModalEdit();
          setTimeout(() => {
            this.alertService.openModal('success', 'Categoría actualizada correctamente!');
          }, 100);
          this.loadUserData();
        },
        (error) => {
          console.error('Error al actualizar categoría', error);
        }
      );
    }
  }





  user = {
    firstName: 'Musharof',
    lastName: 'Chowdhury',
    email: 'randomuser@pimjo.com',
    phone: '+09 363 398 46',
    bio: 'Team Manager',
    social: {
      facebook: 'https://www.facebook.com/PimjoHQ',
      x: 'https://x.com/PimjoHQ',
      linkedin: 'https://www.linkedin.com/company/pimjo',
      instagram: 'https://instagram.com/PimjoHQ',
    },
  };

  handleSave() {
    // Handle save logic here
    console.log('Saving changes...');
    this.modal.closeModal();
  }
}
