import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { UserMetaCardComponent } from '../../shared/components/user-profile/user-meta-card/user-meta-card.component';
import { UserPersonalInfoCardComponent } from '../../shared/components/user-profile/user-personal-info-card/user-personal-info-card.component';
import { UserDataInfoCardComponent } from '../../shared/components/user-profile/user-data-info-card/user-data-info-card.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    PageBreadcrumbComponent,
    UserMetaCardComponent,
    UserDataInfoCardComponent,
    UserPersonalInfoCardComponent,
  ],
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent {

}
