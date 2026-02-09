import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { CheckboxComponent } from '../../form/input/checkbox.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-form',
  imports: [
    CommonModule,
    LabelComponent,
    CheckboxComponent,
    ButtonComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './signin-form.component.html',
  providers: [AuthService],
  styles: ``
})
export class OldSigninFormComponent {


  showAlert = false;
  alertVariant: 'success' | 'error' | 'warning' | 'info' = 'info';
  alertTitle = '';
  alertMessage = '';

  showPassword = false;
  isChecked = false;

  loginForm !: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private notificationService: NotificationService, private router: Router) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    const formData = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.signIn(formData).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          this.notificationService.show('success', 'Inicio de sesión exitoso', 'Has iniciado sesión correctamente.');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.notificationService.show('error', 'Error al iniciar sesión', 'Revisa tus credenciales e intenta nuevamente.');
        }
      });
    } else {
      this.notificationService.show('warning', 'Formulario inválido', 'Por favor completa todos los campos requeridos.');
    }
  }
}