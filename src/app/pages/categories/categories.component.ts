import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';
import { AvatarTextComponent } from '../../shared/components/ui/avatar/avatar-text.component';
import { CheckboxComponent } from '../../shared/components/form/input/checkbox.component';
import { ModalService } from '../../shared/services/modal.service';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { CategoryFormComponent } from '../../shared/components/categories/category-form.component';

@Component({
  selector: 'app-categories',
  imports: [
    CategoryFormComponent,
  ],
  templateUrl: './categories.component.html',
  styles: ``
})
export class CategoriesComponent {

}
