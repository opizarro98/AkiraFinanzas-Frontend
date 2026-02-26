import { Component } from '@angular/core';
import { MovementsFormComponent } from '../../shared/components/movements/movements.form.component';
import { AccountCardComponent } from '../../shared/components/accounts/account-cards/account-card.component';

@Component({
  selector: 'app-operations-hub',
  imports: [
    AccountCardComponent,
    MovementsFormComponent,
  ],
  templateUrl: './operations-hub.component.html',
  styles: ``
})
export class OperationsHubComponent {

}
