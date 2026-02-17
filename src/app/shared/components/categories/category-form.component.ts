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
import { ModalService } from '../../services/modal.service';
import { NotificationService } from '../../services/notification.service';
import { CategoryResponseDTO } from '../../models/categories/CategoryResponseDTO';
import { CategoryService } from '../../services/category/category.service';
import { CategoryTypeEnum } from '../../models/CategoryTypeEnum';

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
    categories: CategoryResponseDTO[] = [];
    categoriesFrom !: FormGroup;
    isOpen = false;
    selectedValue = '';
    isConfirmOpen: boolean = false;
    selectedAccountId: string = '';
    titleConfirm: string = '';
    messageConfirm: string = '';

    options = Object.entries(CategoryTypeEnum).map(([key, value]) => ({
        value: value,
        label: key
    }));

    constructor(private categoryService: CategoryService, public modal: ModalService, private fb: FormBuilder, private notificationService: NotificationService,) {
        this.categoriesFrom = this.fb.group({
            categoryId: [''],
            name: [''],
            type: ['']
        });
    }

    ngOnInit() {
        this.loadCategories();
    }

    // Metodo para guardar una categoria nueva o actualizar una categoria existente
    SaveCategory() {
        if (this.categoriesFrom.invalid) {
            this.notificationService.show('error', 'Error', 'Por favor, completa todos los campos requeridos');
            return;
        }
        if (this.isCreateMode) {
            const formData = this.categoriesFrom.value;
            formData.type = this.selectedValue;
            this.categoryService.createCategory(formData).subscribe({
                next: () => {
                    this.notificationService.show('success', 'Creación exitosa', 'categoria creada correctamente');
                    this.loadCategories();
                    this.closeModal();
                    this.categoriesFrom.reset();
                },
                error: () => {
                    this.notificationService.show('error', 'Error', 'No se pudo crear la categoria');
                }
            });
        }
        else {
            const formData = this.categoriesFrom.getRawValue();
            console.log('Datos del formulario para actualización:', formData);
            formData.type = this.selectedValue;
            this.categoryService.updateCategory(formData).subscribe({
                next: (response) => {
                    this.notificationService.show('success', 'Actualización exitosa', 'Categoría actualizada correctamente');
                    this.categoriesFrom.reset();
                    this.loadCategories();
                    this.closeModal();
                },
                error: (error) => {
                    this.closeModal();
                    this.notificationService.show('error', 'Error', 'No se pudo actualizar la categoría');
                }
            });
        }
    }

    // Metodo para cargar las categorias del usuario
    loadCategories() {
        this.categoryService.getCategories().subscribe({
            next: (response) => {
                this.categories = response;
            },
            error: (error) => {
                console.error('Error fetching categories:', error);
            }
        });
    }

    //Metodo para eliminar una categoria existente
    deleteCategory(categoryId: string) {
        this.categoryService.deleteCategory(categoryId).subscribe({
            next: (success) => {
                if (success) {
                    this.notificationService.show('success', 'Eliminación exitosa', 'Categoría eliminada correctamente');
                    this.loadCategories();
                } else {
                    this.notificationService.show('error', 'Error', 'No se pudo eliminar la categoría');
                }
                this.isConfirmOpen = false;
            },
            error: (err) => {
                console.error('Error al eliminar', err);
                this.isConfirmOpen = false;
            }
        });
    }

    //Abrir modal para crear una nueva categoria
    openCreateModal() {
        this.isCreateMode = true;
        this.titelCategory = 'Nueva categoría';
        this.descriptionmodal = 'Crea una nueva categoría.';
        this.selectedValue = '';
        this.isOpen = true;
    }
    //Abrir modal para editar una categoria existente
    openEditModal(category: CategoryResponseDTO) {
        this.isCreateMode = false;
        this.titelCategory = 'Editar categoría';
        this.descriptionmodal = 'Edita una categoría existente.';
        this.categoriesFrom.patchValue({
            categoryId: category.categoryId,
            name: category.name,
            type: category.type
        });
        this.selectedValue = category.type;
        this.isOpen = true;
    }
    //Cerrar el modal
    closeModal() {
        this.categoriesFrom.reset();
        this.isOpen = false;
    }


    //Metodo para manejar el cambio de selección en el componente Select
    handleSelectChange(value: string) {
        this.selectedValue = value;
    }

    // Metodo para obtener la etiqueta legible del tipo de categoria
    getCategoryTypeLabel(type: CategoryTypeEnum): string {
        return this.categoryTypeLabelMap[type] ?? type;
    }
    // Mapeo para convertir los valores del enum en etiquetas legibles
    categoryTypeLabelMap: Record<CategoryTypeEnum, string> = {
        [CategoryTypeEnum.Gasto]: 'GASTO',
        [CategoryTypeEnum.Ingreso]: 'INGRESO'
    };


    openDeleteModal(accountId: string) {
        this.selectedAccountId = accountId;
        this.isConfirmOpen = true;
        this.titleConfirm = 'Eliminar categoría';
        this.messageConfirm = '¿Estás seguro que deseas eliminar esta categoría?';
    }

}
