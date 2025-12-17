import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';
import { AvatarTextComponent } from '../../shared/components/ui/avatar/avatar-text.component';
import { CheckboxComponent } from '../../shared/components/form/input/checkbox.component';
import { ModalService } from '../../shared/services/modal.service';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { CategoryService } from '../../shared/services/category/category.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCategoryDTO } from '../../shared/model/Category/CreateCategoryDTO';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
    AvatarTextComponent,
    InputFieldComponent,
    ButtonComponent,
    LabelComponent,
    ModalComponent,
    InputFieldComponent,
    HttpClientModule,
    ReactiveFormsModule,],
  templateUrl: './categories.component.html',
  providers: [CategoryService],
  styles: ``
})
export class CategoriesComponent {

  // Variables 
  newCategoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  categories: any[] = [];


  constructor(
    public modal: ModalService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.newCategoryForm.valid) {
      console.log(this.newCategoryForm.value);
    }
    this.loadCategories();
  }



  // ACCIONES PARA EL MODAL DE CREAR
  isOpenNew = false;
  openModalNew() { this.isOpenNew = true; }
  closeModalNew() { this.isOpenNew = false; }

  // ACCIONES PARA EL MODAL DE EDITAR
  isOpenEdit = false;
  openModalEdit() { this.isOpenEdit = true; }
  closeModalEdit() { this.isOpenEdit = false; }


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

  guardarnuevaCategoria(): void {
    console.log('Formulario de nueva categoría:', this.newCategoryForm.value);
  }


  actualziarCategoria(): void {
    console.log('Lógica para actualizar la categoría');
  }







  user = {
    firstName: 'Musharof',
    lastName: 'Chowdhury',
    email: 'randomuser@pimjo.com',
    phone: '+09 363 398 46',
    bio: 'Team Manager',
    social: {
      facebook: 'https://www.facebook.com/PimjoHQ',
      x: 'https://x.com/PimjoHQ',
      linkedin: 'https://www.linkedin.com/company/pimjo',
      instagram: 'https://instagram.com/PimjoHQ',
    },
  };

}
