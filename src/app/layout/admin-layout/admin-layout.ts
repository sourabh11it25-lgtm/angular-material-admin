import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../core/services/theme-service/theme-service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    AsyncPipe,
    MatDividerModule,
    MatMenuModule 
  ],
  
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {


  themeService = inject(ThemeService);
  
  private authService = inject(AuthService);
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleMenu() {
    this.sidenav.toggle();
  }

   private breakpointObserver = inject(BreakpointObserver);

  // Observable that returns true if screen is small (Handset)
  isMobile$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  // Helper to close sidenav only on mobile after clicking a link
  closeOnMobile() {
    this.isMobile$.subscribe(isMobile => {
      if (isMobile) {
        this.sidenav.close();
      }
    });
  }

   // Search logic (optional)
  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    console.log('Searching for:', query);
    // You can connect this to a Shared Service later to filter the Users Table
  }

  onLogout() {
    this.authService.logout();
  }

}

