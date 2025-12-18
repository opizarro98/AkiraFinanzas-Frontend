import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { AvatarTextComponent } from '../../../shared/components/ui/avatar/avatar-text.component';
import { ModalService } from '../../../shared/services/modal.service';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { LabelComponent } from '../../../shared/components/form/label/label.component';
import { CategoryService } from '../../../shared/services/category/category.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldAKFComponent } from '../../../shared/components/form/input/input-field-akf.component';
import { CreateCategoryDTO } from '../../../shared/model/Category/CreateCategoryDTO';
import { AlertService } from '../../../shared/services/alert.service';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import { ModalComponent } from '../../../shared/components/ui/modal/modal.component';
import { UpdateCategoryDTO } from '../../../shared/model/Category/UpdateCategoryDTO';


@Component({
  selector: 'app-categories',
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
    ReactiveFormsModule,],
  templateUrl: './categories.component.html',
  providers: [CategoryService],
  styles: ``
})
export class CategoriesComponent {

  // Variables 
  newCategory?: CreateCategoryDTO;
  updateCategoryExist?: UpdateCategoryDTO;
  newCategoryForm = new FormGroup({                               // Formulario para nueva categoría
    name: new FormControl('', Validators.required),
  });

  updateCategoryForm = new FormGroup({                          // Formulario para actualizar categoría
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });
  categories: any[] = [];


  constructor(
    public modal: ModalService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    if (this.newCategoryForm.valid) {
    }
    this.loadCategories();
  }



  // ACCIONES PARA EL MODAL DE CREAR
  isOpenNew = false;
  openModalNew() { this.isOpenNew = true; }
  closeModalNew() { this.isOpenNew = false; }

  // ACCIONES PARA EL MODAL DE EDITAR
  isOpenEdit = false;
  openModalEdit(updateCategory: UpdateCategoryDTO) {
    this.isOpenEdit = true;
    this.updateCategoryForm.patchValue({
      id: updateCategory.id,
      name: updateCategory.name,
    });
  }
  closeModalEdit() { this.isOpenEdit = false; }


  // Metodo para cargar categorias
  loadCategories(): void {
    this.categoryService.getAllActiveCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error al cargar categorías', error);
      }
    );
  }

  // Metodo para guardar nueva categoria
  saveNewCategory(): void {
    this.newCategory = {
      name: this.newCategoryForm.get('name')?.value || '',
    };

    this.categoryService.createNewCategory(this.newCategory).subscribe(
      (response) => {
        this.closeModalNew();
        setTimeout(() => {
          this.alertService.openModal('success', 'Categoría guardada correctamente!');
        }, 100);
        this.loadCategories();
        this.newCategoryForm.reset();
      },
      (error) => {
        console.error('Error al crear categoría', error);
      }
    );
  }



  // Metodo para actualizar categoria existente
  updateCategory(): void {
    this.updateCategoryExist = {
      id: this.updateCategoryForm.get('id')?.value || '',
      name: this.updateCategoryForm.get('name')?.value || '',
    };
    this.categoryService.updateCategory(this.updateCategoryExist).subscribe(
      (response) => {
        this.closeModalEdit();
        setTimeout(() => {
          this.alertService.openModal('success', 'Categoría actualizada correctamente!');
        }, 100);
        this.loadCategories();
      },
      (error) => {
        console.error('Error al actualizar categoría', error);
      }
    );
  }


  // Metodo para eliminar categoria
  deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe(
      (response) => {
        setTimeout(() => {
          this.alertService.openModal('success', 'Categoría eliminada correctamente!');
        }, 100);
        this.loadCategories();
      },
      (error) => {
        console.error('Error al eliminar categoría', error);
      }
    );
  }

}
