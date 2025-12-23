import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateAccountsDTO } from '../../../shared/model/Accounts/CreateAccountsDTO';
import { UpdateAccountsDTO } from '../../../shared/model/Accounts/UpdateAccountsDTO';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../shared/services/modal.service';
import { AccountsService } from '../../../shared/services/accounts/Accounts.service';
import { AlertService } from '../../../shared/services/alert.service';
import { GetAllActiveDTO } from '../../../shared/model/Accounts/GetAllActiveDTO';
import { InputFieldAKFComponent } from '../../../shared/components/form/input/input-field-akf.component';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import { ModalComponent } from '../../../shared/components/ui/modal/modal.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { LabelComponent } from '../../../shared/components/form/label/label.component';
import { AvatarTextComponent } from '../../../shared/components/ui/avatar/avatar-text.component';
import { SelectComponent } from '../../../shared/components/form/select/select.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
    AvatarTextComponent,
    InputFieldAKFComponent,
    ButtonComponent,
    ModalAlertsComponent,
    ModalComponent,
    LabelComponent,
    HttpClientModule,
    ReactiveFormsModule,
    SelectComponent,],
  templateUrl: './accounts.component.html',
  providers: [AccountsService],
  styles: ``
})
export class AccountsComponent {

  // Variables 
  newAccount?: CreateAccountsDTO;
  updateAccountExist?: UpdateAccountsDTO;
  newAccountForm = new FormGroup({                               // Formulario para nueva cuenta del usuario
    accountName: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    balance: new FormControl('', Validators.required),
  });

  updateAccountForm = new FormGroup({                          // Formulario para actualizar cuentas del usuario 
    accountId: new FormControl('', Validators.required),
    accountName: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    balance: new FormControl('', Validators.required),
  });
  accountsList: GetAllActiveDTO[] = [];


  optionsAccountType = [
    { value: 'AHORROS', label: 'Cuenta de Ahorros' },
    { value: 'CORRIENTE', label: 'Cuenta Corriente' },
    { value: 'NOMINA', label: 'Cuenta Nómina' },
    { value: 'PLAZO_FIJO', label: 'Cuenta a Plazo Fijo' },
    { value: 'EMPRESARIAL', label: 'Cuenta Empresarial' },
    { value: 'INVERSION', label: 'Cuenta de Inversión' },
    { value: 'MANCOMUNADA', label: 'Cuenta Compartida' },
    { value: 'DIGITAL', label: 'Cuenta Digital' },
    { value: 'ESTUDIANTIL', label: 'Cuenta para Estudiantes' },
    { value: 'MONEDA_EXTRANJERA', label: 'Cuenta en Moneda Extranjera' }
  ];
  selectedOption = '';
  dateValue: any;
  timeValue = '';
  cardNumber = '';

  handleSelectChange(value: string) {
    this.selectedOption = value;
    console.log('Selected value:', value);
  }

  constructor(
    public modal: ModalService,
    private accountService: AccountsService,
    private alertService: AlertService,
  ) { }

  // ACCIONES PARA EL MODAL DE CREAR
  isOpenNew = false;
  openModalNew() { this.isOpenNew = true; }
  closeModalNew() { this.isOpenNew = false; }

  // ACCIONES PARA EL MODAL DE EDITAR
  isOpenEdit = false;
  openModalEdit(updateAccount: UpdateAccountsDTO) {
    this.isOpenEdit = true;
    this.updateAccountForm.patchValue({
      accountId: updateAccount.accountId,
      accountName: updateAccount.accountName,
      type: updateAccount.type,
      balance: updateAccount.balance,
    });
  }

  closeModalEdit() { this.isOpenEdit = false; }

  ngOnInit(): void {
    this.loadAccounts();
  }


  //Metodo para cargar todas las cuentas
  loadAccounts() {
    this.accountService.getAllAccounts().subscribe(
      (response) => {
        this.accountsList = response;
      },
      (error) => {
        console.error('Error al cargar cuentas', error);
      }
    );
  }

  //Metodo para guardar nueva cuenta
  saveNewAccount() {
    this.newAccount = {
      accountName: this.newAccountForm.get('accountName')?.value || '',
      type: this.selectedOption,
      balance: this.newAccountForm.get('balance')?.value || '',
    };

    console.log(this.newAccount);
    this.accountService.createAccount(this.newAccount).subscribe(
      (response) => {
        this.closeModalNew();
        setTimeout(() => {
          this.alertService.openModal('success', 'Cuenta creada exitosamente.');
        }, 100);
        this.loadAccounts();
      },
      (error) => {
        console.error('Error al crear la cuenta', error);
        this.alertService.openModal('error', 'Error al crear la cuenta.');
      }
    );
  }

  // Metodo para actualizar cuentas existente
  updateAccount(): void {
    this.updateAccountExist = {
      accountId: this.updateAccountForm.get('accountId')?.value || '',
      accountName: this.updateAccountForm.get('accountName')?.value || '',
      type: this.updateAccountForm.get('type')?.value || '',
      balance: this.updateAccountForm.get('balance')?.value || '',
    };
    this.accountService.updateAccount(this.updateAccountExist).subscribe(
      (response) => {
        this.closeModalEdit();
        setTimeout(() => {
          this.alertService.openModal('success', 'Cuenta actualizada correctamente!');
        }, 100);
        this.loadAccounts();
      },
      (error) => {
        console.error('Error al actualizar cuenta', error);
      }
    );
  }


  // Metodo para eliminar cuenta
  deleteAccount(id: string): void {
    this.accountService.deleteAccount(id).subscribe(
      (response) => {
        setTimeout(() => {
          this.alertService.openModal('success', 'Cuenta eliminada correctamente!');
        }, 100);
        this.loadAccounts();
      },
      (error) => {
        console.error('Error al eliminar cuenta', error);
      }
    );
  }

}
