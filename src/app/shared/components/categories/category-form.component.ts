import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarTextComponent } from '../ui/avatar/avatar-text.component';
import { ModalComponent } from '../ui/modal/modal.component';
import { ButtonComponent } from '../ui/button/button.component';
import { InputFieldComponent } from '../form/input/input-field.component';
import { LabelComponent } from '../form/label/label.component';
import { SelectComponent } from '../form/select/select.component';
import { ConfirmModalComponent } from '../ui/modalConfirm/confirmModal.component';
import { AccountResponseDTO } from '../../models/account/AccountResponseDTO';
import { AccountService } from '../../services/account/account.service';
import { ModalService } from '../../services/modal.service';
import { NotificationService } from '../../services/notification.service';
import { AccountTypeEnum } from '../../models/AccountTypeEnum';

@Component({
    selector: 'app-category-form',
    imports: [
        CommonModule,
        AvatarTextComponent,
        ModalComponent,
        ButtonComponent,
        InputFieldComponent,
        LabelComponent,
        SelectComponent,
        FormsModule,
        ReactiveFormsModule,
        ConfirmModalComponent,
    ],
    templateUrl: './category-form.component.html',
    styles: ``
})
export class CategoryFormComponent {

    isCreateMode: boolean = true;
    titelCategory: string = '';
    descriptionmodal: string = '';
    accounts: AccountResponseDTO[] = [];
    accountForm !: FormGroup;
    isOpen = false;
    selectedValue = '';
    isConfirmOpen: boolean = false;
    selectedAccountId: string = '';
    titleConfirm: string = '';
    messageConfirm: string = '';

    options = Object.entries(AccountTypeEnum).map(([key, value]) => ({
        value: value,
        label: key
    }));

    constructor(private accountService: AccountService, public modal: ModalService, private fb: FormBuilder, private notificationService: NotificationService,) {
        this.accountForm = this.fb.group({
            accountId: [''],
            name: [''],
            initialBalance: [''],
            type: ['']
        });
    }



    ngOnInit() {
        this.loadCategories();
    }


    // Metodo para guardar una cuenta nueva o actualizar una cuenta existente
    SaveAccount() {
        if (this.accountForm.invalid) {
            this.notificationService.show('error', 'Error', 'Por favor, completa todos los campos requeridos');
            return;
        }
        if (this.isCreateMode) {
            const formData = this.accountForm.value;
            formData.type = this.selectedValue;
            this.accountService.createAccount(formData).subscribe({
                next: (response) => {
                    this.notificationService.show('success', 'Creación exitosa', 'Cuenta creada correctamente');
                    this.loadCategories();
                    this.closeModal();
                    this.accountForm.reset();
                },
                error: (error) => {
                    this.notificationService.show('error', 'Error', 'No se pudo crear la cuenta');
                }
            });
        }
        else {
            const formData = this.accountForm.getRawValue();
            console.log('Datos del formulario para actualización:', formData);
            formData.type = this.selectedValue;
            this.accountService.updateAccount(formData).subscribe({
                next: (response) => {
                    this.notificationService.show('success', 'Actualización exitosa', 'Cuenta actualizada correctamente');
                    this.accountForm.reset();
                    this.loadCategories();
                    this.closeModal();
                },
                error: (error) => {
                    this.closeModal();
                    this.notificationService.show('error', 'Error', 'No se pudo actualizar la cuenta');
                }
            });
        }
    }


    // Metodo para cargar las cuentas del usuario
    loadCategories() {
        this.accountService.getAccounts().subscribe({
            next: (response) => {
                this.accounts = response;
            },
            error: (error) => {
                console.error('Error fetching accounts:', error);
            }
        });
    }


    //Metodo para eliminar una cuenta existente
    deleteAccount(accountId: string) {
        this.accountService.deleteAccount(accountId).subscribe({
            next: (success) => {
                if (success) {
                    this.notificationService.show('success', 'Eliminación exitosa', 'Cuenta eliminada correctamente');
                    this.loadCategories();
                } else {
                    this.notificationService.show('error', 'Error', 'No se pudo eliminar la cuenta');
                }
                this.isConfirmOpen = false;
            },
            error: (err) => {
                console.error('Error al eliminar', err);
                this.isConfirmOpen = false;
            }
        });
    }

    //Abrir modal para crear una nueva cuenta
    openCreateModal() {
        this.isCreateMode = true;
        this.titelCategory = 'Nueva cuenta';
        this.descriptionmodal = 'Crea una nueva cuenta.';
        this.selectedValue = '';
        this.isOpen = true;
    }
    //Abrir modal para editar una cuenta existente
    openEditModal(account: AccountResponseDTO) {
        this.isCreateMode = false;
        this.titelCategory = 'Editar cuenta';
        this.descriptionmodal = 'Edita una cuenta existente.';
        this.accountForm.patchValue({
            accountId: account.accountId,
            name: account.name,
            initialBalance: account.balance,
            type: account.type
        });
        this.selectedValue = account.type;
        this.isOpen = true;
    }
    //Cerrar el modal
    closeModal() { this.isOpen = false; }


    //Metodo para manejar el cambio de selección en el componente Select
    handleSelectChange(value: string) {
        this.selectedValue = value;
    }

    // Metodo para obtener la etiqueta legible del tipo de cuenta
    getAccountTypeLabel(type: AccountTypeEnum): string {
        return this.accountTypeLabelMap[type] ?? type;
    }
    // Mapeo para convertir los valores del enum en etiquetas legibles
    accountTypeLabelMap: Record<AccountTypeEnum, string> = {
        [AccountTypeEnum.Banco]: 'Banco',
        [AccountTypeEnum.Efectivo]: 'Efectivo'
    };


    openDeleteModal(accountId: string) {
        this.selectedAccountId = accountId;
        this.isConfirmOpen = true;
        this.titleConfirm = 'Eliminar cuenta';
        this.messageConfirm = '¿Estás seguro que deseas eliminar esta cuenta?';
    }

}
