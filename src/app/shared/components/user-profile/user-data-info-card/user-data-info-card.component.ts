import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { LabelComponent } from '../../form/label/label.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { NotificationService } from '../../../services/notification.service';
import { UpdatePassRequestDTO } from '../../../models/authapp/UpdatePassRequestDTO';

@Component({
  selector: 'app-user-data-info-card',
  imports: [
    CommonModule,
    InputFieldComponent,
    ButtonComponent,
    LabelComponent,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-data-info-card.component.html',
  styles: ``
})
export class UserDataInfoCardComponent {

  username: string | null = null;
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  oldPassIsValid: boolean | null = null;
  passwordchancgeForm!: FormGroup;
  oldPassword!: string;
  passwordMismatch: boolean | null = null;
  confirmPassMismatch: boolean | null = null;
  updatePassRequest!: UpdatePassRequestDTO;



  constructor(private fb: FormBuilder, public modal: ModalService, private authService: AuthService, private notificactionService: NotificationService) {
    this.passwordchancgeForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; this.passwordchancgeForm.reset(); this.oldPassIsValid = null; this.confirmPassMismatch = null; }


  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.username = this.authService.getUsername();
    console.log("suername es: " + this.username);
  }

  ispassvalid() {
    const control = this.passwordchancgeForm.get('oldPassword');
    if (!control || !control.value) {
      this.oldPassIsValid = null;
      return;
    }
    this.authService.passwordIsCorrect(control.value).subscribe({
      next: (response) => {
        this.oldPassIsValid = response
      },
      error: (error) => {
        this.oldPassIsValid = false;
      }
    })
  }

  updatePassword() {
    const formData = this.passwordchancgeForm.value;
    this.authService.changePassword(formData).subscribe({
      next: () => {
        this.notificactionService.show('success', 'Actualizacion correcta', 'Se ha actiualizado corrextamente la contraseña.');
        this.closeModal();
        this.oldPassIsValid = null;
        this.passwordchancgeForm.reset();
        this.confirmPassMismatch = null;
      },
      error: () => {
        this.notificactionService.show('error', 'Error', 'Error al actualizar la contraseña, consulte al administrador.');
      }
    });
    this.modal.closeModal();

  }

  passwordMatchValidator() {
    const newPass = this.passwordchancgeForm.get('newPassword')?.value;
    const confirmPass = this.passwordchancgeForm.get('confirmPassword')?.value;
    if (newPass === confirmPass) {
      this.confirmPassMismatch = true; // coinciden
      this.updatePassword();
    } else {
      this.confirmPassMismatch = false; // no coinciden
    }
  }

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }
  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }
  toggleConfrimPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
