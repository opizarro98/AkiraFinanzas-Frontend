import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { InfoUserCardComponent } from '../../../shared/components/user-profile/info-user-card/info-user-card.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movements',
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
    HttpClientModule,
  ],
  templateUrl: './movements.component.html',
  styles: ``
})
export class MovementsComponent {

}
