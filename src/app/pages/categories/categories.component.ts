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

@Component({
  selector: 'app-categories',
  imports: [ 
    CommonModule,
    PageBreadcrumbComponent,
    AvatarTextComponent,
    InputFieldComponent,
    ButtonComponent,
    LabelComponent,
    ModalComponent,],
  templateUrl: './categories.component.html',
  styles: ``
})
export class CategoriesComponent {

  constructor(public modal: ModalService) {}
  
    isOpen = false;
    openModal() { this.isOpen = true; }
    closeModal() { this.isOpen = false; }
  
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
    
  
    handleSave() {
      // Handle save logic here
      console.log('Saving changes...');
      this.modal.closeModal();
    }
  tableRowData = [
    {
      id: 'DE124321',
      user: { initials: 'AB', name: 'John Doe', email: 'johndoe@gmail.com' },
      avatarColor: 'brand',
      product: { name: 'Software License', price: '$18,50.34', purchaseDate: '2024-06-15' },
      status: { type: 'Complete' },
      actions: { delete: true, edit: true },
    },
  ];

  selectedRows: string[] = [];
  selectAll: boolean = false;

  handleSelectAll() {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectedRows = this.tableRowData.map(row => row.id);
    } else {
      this.selectedRows = [];
    }
  }

  handleRowSelect(id: string) {
    if (this.selectedRows.includes(id)) {
      this.selectedRows = this.selectedRows.filter(rowId => rowId !== id);
    } else {
      this.selectedRows = [...this.selectedRows, id];
    }
  }

  getBadgeColor(type: string): 'success' | 'warning' | 'error' {
    if (type === 'Complete') return 'success';
    if (type === 'Pending') return 'warning';
    return 'error';
  }
}
