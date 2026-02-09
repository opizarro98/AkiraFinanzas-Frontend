import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { CheckboxComponent } from '../../form/input/checkbox.component';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    CommonModule,
    LabelComponent,
    CheckboxComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './signup-form.component.html',
  providers: [AuthService],
  styles: ``
})
export class SignupFormComponent {

  showAlert = false;
  alertVariant: 'success' | 'error' | 'warning' | 'info' = 'info';
  alertTitle = '';
  alertMessage = '';

  registerForm!: FormGroup; //formulario de registro

  constructor(private fb: FormBuilder, private authService: AuthService, private notificationService: NotificationService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      secondLastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  singup() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formData = this.registerForm.value;

    this.authService.userRegister(formData).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.notificationService.show('success', 'Registro exitoso', 'Usuario registrado correctamente');
          this.registerForm.reset();
          this.router.navigate(['/']);
        } else {
          this.notificationService.show('error', 'Error', 'No se pudo registrar el usuario');
        }
      },
      error: () => {
        this.notificationService.show('error', 'Error del servidor', 'Ocurrió un problema inesperado');
      }
    });
  }

  showPassword = false;
  isChecked = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}