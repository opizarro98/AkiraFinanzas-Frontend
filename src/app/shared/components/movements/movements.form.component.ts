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
    currentPage = 1;
    itemsPerPage = 10;
    isOpenModal = false;
    movementFormData !: FormGroup;
    isExpense = false;
    isIncome = false;
    selectedValueType = '';
    options = Object.entries(MovementTypeEnum).map(([key, value]) => ({
        value: value,
        label: key
    }));

    constructor(private fb: FormBuilder, private movementService: MovementService, private notificationService: NotificationService) {
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
    }



    loadMovements() {
        this.movementService.getMovements().subscribe(
            (data) => {
                this.movementData = data;
                console.log('Movements loaded:', this.movementData);
            },
            () => {
                this.notificationService.show('error', 'Error', 'No se pudieron cargar los movimientos, intenta nuevamente más tarde.');
            }
        );
    }

    saveData() {

    }

    //Abrir modal para crear una nueva categoria
    openModal() {
        this.isOpenModal = true;
    }

    //Cerrar el modal
    closeModal() {
        this.movementFormData.reset();
        this.isOpenModal = false;
        this.selectedValueType = '';
    }


    //Metodo para manejar el cambio de selección en el componente Select
    handleSelectChange(value: string) {
        this.selectedValueType = value;

        this.isExpense = value === MovementTypeEnum.Egreso;
        this.isIncome = value === MovementTypeEnum.Ingreso;

        if (!this.isExpense && !this.isIncome) {
            this.isExpense = true;
            this.isIncome = true;
        }
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

    // Metodo para obtener la etiqueta legible del tipo de movimiento
    getMovementTypeLabel(type: MovementTypeEnum): string {
        return this.movementTypeLabelMap[type] ?? type;
    }
    // Mapeo para convertir los valores del enum en etiquetas legibles
    movementTypeLabelMap: Record<MovementTypeEnum, string> = {
        [MovementTypeEnum.Egreso]: 'GASTO',
        [MovementTypeEnum.Ingreso]: 'INGRESO',
        [MovementTypeEnum.Transferencia]: 'TRANSFERENCIA'
    };
}
