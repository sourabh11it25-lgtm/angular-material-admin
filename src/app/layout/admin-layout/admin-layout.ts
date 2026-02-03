import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-admin-layout',
  imports: [],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {


  private authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }
}
