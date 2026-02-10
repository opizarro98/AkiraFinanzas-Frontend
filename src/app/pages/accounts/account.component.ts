import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';
import { AvatarTextComponent } from '../../shared/components/ui/avatar/avatar-text.component';
import { AccountResponseDTO } from '../../shared/models/account/AccountResponseDTO';
import { AccountService } from '../../shared/services/account/account.service';

@Component({
  selector: 'app-account',
  imports: [
    CommonModule,
    AvatarTextComponent,
  ],
  templateUrl: './account.component.html',
  styles: ``
})
export class AccountComponent {

  accounts: AccountResponseDTO[] = [];

  constructor(private accountService: AccountService) {
  }


  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (response) => {
        this.accounts = response;
      },
      error: (error) => {
        console.error('Error fetching accounts:', error);
      }
    });
  }

  getBadgeColor(type: string): 'success' | 'warning' | 'error' {
    if (type === 'Complete') return 'success';
    if (type === 'Pending') return 'warning';
    return 'error';
  }
}
