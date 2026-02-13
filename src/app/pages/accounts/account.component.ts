import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarTextComponent } from '../../shared/components/ui/avatar/avatar-text.component';
import { AccountResponseDTO } from '../../shared/models/account/AccountResponseDTO';
import { AccountService } from '../../shared/services/account/account.service';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { ModalService } from '../../shared/services/modal.service';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';
import { SelectComponent } from '../../shared/components/form/select/select.component';
import { AccountTypeEnum } from '../../shared/models/AccountTypeEnum';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../shared/services/notification.service';
import { ConfirmModalComponent } from '../../shared/components/ui/modalConfirm/confirmModal.component';
import { AccountFormComponent } from '../../shared/components/accounts/account-form.component';

@Component({
  selector: 'app-account',
  imports: [
    AccountFormComponent,
  ],
  templateUrl: './account.component.html',
  styles: ``
})
export class AccountComponent {

}
