import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './core/services/auth-service';

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    AsyncPipe 
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
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

  onLogout() {
    this.authService.logout();
  }

}
