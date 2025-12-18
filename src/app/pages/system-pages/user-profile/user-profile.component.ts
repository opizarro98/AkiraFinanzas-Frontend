import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';

@Component({
  selector: 'app-user-profile',
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
  ],
  templateUrl: './user-profile.component.html',
  styles: ``
})
export class UserProfileComponent {

}
