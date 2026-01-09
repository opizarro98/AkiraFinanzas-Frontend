import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LabelComponent } from '../../../../shared/components/form/label/label.component';
import { CheckboxComponent } from '../../../../shared/components/form/input/checkbox.component';
import { InputFieldAKFComponent } from '../../../../shared/components/form/input/input-field-akf.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { AvatarTextComponent } from '../../../../shared/components/ui/avatar/avatar-text.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { ModalAlertsComponent } from '../../../../shared/components/modal-alerts/modal-alerts.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateUserDTO } from '../../../../shared/model/User/CreateUserDTO';
import { PersonService } from '../../../../shared/services/Person/Person.service';
import { GetPersonCompleteDTO } from '../../../../shared/model/Person/GerPersonCompleteDTO';
import { UserService } from '../../../../shared/services/user/User.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { CreatePersonDTO } from '../../../../shared/model/Person/CreatePersonDTO';


@Component({
  selector: 'app-signup-form',
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
    AvatarTextComponent,
    InputFieldAKFComponent,
    ButtonComponent,
    ModalAlertsComponent,
    LabelComponent,
    HttpClientModule,
    CheckboxComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './signup-form.component.html',
  styles: ``
})
export class SignupFormComponent {


  //Variables 
  newPerson?: CreatePersonDTO;
  newUser?: CreateUserDTO;
  findPerson?: GetPersonCompleteDTO;

  formSingIn = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    secondLastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl(''),
  });

  showPassword = false;
  isChecked = false;

  constructor(
    private personService: PersonService,
    private userService: UserService,
    private alertService: AlertService,
  ) { }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    this.newPerson = {
      firstName: this.formSingIn.value.firstName || '',
      middleName: this.formSingIn.value.middleName || undefined,
      lastName: this.formSingIn.value.lastName || '',
      secondLastName: this.formSingIn.value.secondLastName || undefined,
      email: this.formSingIn.value.email || '',
      phone: this.formSingIn.value.phone || undefined,
    };
    this.personService.createPerson(this.newPerson).subscribe({
      next: () => {
        this.personService.getPersonCompleteByEmail(this.newPerson!.email)
          .subscribe({
            next: (GetPerson) => {
              this.newUser = {
                username: this.formSingIn.value.username!,
                password: this.formSingIn.value.password!,
                person: {
                  personId: GetPerson.personId,
                  firstName: GetPerson.firstName,
                  middleName: GetPerson.middleName,
                  lastName: GetPerson.lastName,
                  secondLastName: GetPerson.secondLastName,
                  email: GetPerson.email,
                  phone: GetPerson.phone,
                }
              };
              this.userService.createUser(this.newUser).subscribe({
                next: (userResponse) => { },
                error: (err) => console.error('Error al crear usuario', err),
              });
            },
            error: (err) => console.error('Error al buscar persona por email', err),
          });
      },
      error: (error) => {
      }
    });
  }
}
