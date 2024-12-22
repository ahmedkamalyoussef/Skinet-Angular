import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BusyService } from '../../core/services/busy.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CommonModule,Location  } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { AccountService } from '../../core/services/account.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatButton,
    MatBadge,
    RouterLink,
    RouterLinkActive,
    MatProgressBar,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatDivider
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  constructor(private router: Router) {}

  busyServise= inject(BusyService);
  cartService = inject(CartService);
  accountService = inject(AccountService);
  

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/account/login');
        this.accountService.currentUser.set(null);
      }
    });
  }
  get isErrorPage() {
    return this.router.url === '/server-error';
  }
  get isNotFoundPage() {
    return this.router.url === '/not-found';
  }
}
