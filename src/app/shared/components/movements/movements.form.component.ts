import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { TableDropdownComponent } from '../common/table-dropdown/table-dropdown.component';
import { BadgeComponent } from '../ui/badge/badge.component';
import { MovementResponseDTO } from '../../models/movements/MovementResponseDTO';
import { MovementService } from '../../services/movements/movement.service';
import { NotificationService } from '../../services/notification.service';
import { MovementTypeEnum } from '../../models/MovementTypeEnum';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../ui/modal/modal.component';
import { InputFieldComponent } from '../form/input/input-field.component';
import { LabelComponent } from '../form/label/label.component';
import { SelectComponent } from '../form/select/select.component';
import { AccountService } from '../../services/account/account.service';
import { AccountResponseDTO } from '../../models/account/AccountResponseDTO';
@Component({
    selector: 'app-movements-form',
    imports: [
        CommonModule,
        ButtonComponent,
        TableDropdownComponent,
        BadgeComponent,
        ModalComponent,
        ButtonComponent,
        InputFieldComponent,
        LabelComponent,
        SelectComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './movements.form.component.html',
    styles: ``
})
export class MovementsFormComponent {
    movementData: MovementResponseDTO[] = []; // Aquí se almacenarán los movimientos obtenidos del servicio
    accounts: AccountResponseDTO[] = [];
    currentPage = 1;
    itemsPerPage = 10;
    isOpenModal = false;
    movementFormData !: FormGroup;
    isExpense = false;
    isIncome = false;
    selectedValueTypeMovement = '';
    selectedValueSourceAccount = '';
    selectedValueTargetAccount = '';
    options = Object.entries(MovementTypeEnum).map(([key, value]) => ({
        value: value,
        label: key
    }));

    constructor(private fb: FormBuilder, private movementService: MovementService, private notificationService: NotificationService, private accountService: AccountService) {
        this.movementFormData = this.fb.group({
            type: ['',],
            amount: ['',],
            description: ['',],
            sourceAccountId: ['',],
            targetAccountId: ['',],
            categoryId: ['',]
        });
    }

    ngOnInit() {
        this.loadMovements();
        this.getAccounts();
    }

    loadMovements() {
        this.movementService.getMovements().subscribe(
            (data) => {
                this.movementData = data;
            },
            () => {
                this.notificationService.show('error', 'Error', 'No se pudieron crear el movimientos, intenta nuevamente más tarde.');
            }
        );
    }

    getAccounts() {
        this.accountService.getAccounts().subscribe({
            next: (data: AccountResponseDTO[]) => {
                console.log('Accounts:', data);
                this.accounts = data;
            }
        });
    }

    saveData() {
        const formData = this.movementFormData.value;
        formData.type = this.selectedValueTypeMovement;
        formData.sourceAccountId = this.selectedValueSourceAccount;
        formData.targetAccountId = this.selectedValueTargetAccount;
        this.movementService.createMovement(formData).subscribe({
            next: () => {
                this.notificationService.show('success', 'Creación exitosa', 'Movimiento creado correctamente');
                this.loadMovements();
                this.closeModal();
                this.reloadModal();
            },
            error: () => {
                this.notificationService.show('error', 'Error', 'No se pudo crear el movimiento');
            }
        });
    }

    //Abrir modal para crear una nueva categoria
    openModal() { this.isOpenModal = true; }

    //Cerrar el modal
    closeModal() { this.reloadModal(); this.isOpenModal = false; }

    reloadModal() {
        this.movementFormData.reset();
        this.selectedValueTypeMovement = '';
        this.selectedValueSourceAccount = '';
        this.selectedValueTargetAccount = '';
        this.isExpense = false;
        this.isIncome = false;
    }
    get totalPages(): number {
        return Math.ceil(this.movementData.length / this.itemsPerPage);
    }

    get currentItems(): MovementResponseDTO[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.movementData.slice(start, start + this.itemsPerPage);
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    handleViewMore(item: MovementResponseDTO) {
        // logic here
        console.log('View More:', item);
    }

    handleDelete(item: MovementResponseDTO) {
        // logic here
        console.log('Delete:', item);
    }

    getBadgeColor(status: string): 'success' | 'warning' | 'error' {
        if (status === 'INCOME') return 'success';
        if (status === 'TRANSFER') return 'warning';
        return 'error';
    }

    /*****************************************************
     *   Metodo para manejar el select de movimientos    *
     *****************************************************/
    //Metodo para manejar el cambio de selección en el componente Select
    handleSelectChangeMovement(value: string) {
        this.selectedValueTypeMovement = value;

        this.isExpense = value === MovementTypeEnum.Gasto;
        this.isIncome = value === MovementTypeEnum.Ingreso;

        if (!this.isExpense && !this.isIncome) {
            this.isExpense = true;
            this.isIncome = true;
        }
    }
    // Metodo para obtener la etiqueta legible del tipo de movimiento
    getMovementTypeLabel(type: MovementTypeEnum): string {
        return this.movementTypeLabelMap[type] ?? type;
    }
    // Mapeo para convertir los valores del enum en etiquetas legibles
    movementTypeLabelMap: Record<MovementTypeEnum, string> = {
        [MovementTypeEnum.Gasto]: 'GASTO',
        [MovementTypeEnum.Ingreso]: 'INGRESO',
        [MovementTypeEnum.Transferencia]: 'TRANSFERENCIA'
    };


    //Metodo para manejar el cambio de selección en el componente Select
    handleSelectChangeSourceAccount(value: string) {
        this.selectedValueSourceAccount = value;
    }

    handleSelectChangeTargetAccount(value: string) {
        this.selectedValueTargetAccount = value;
    }
}
