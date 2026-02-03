import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  totalUsers = signal(1245);
  
  weeklySales = signal([
    { day: 'Mon', value: 40 },
    { day: 'Tue', value: 70 },
    { day: 'Wed', value: 50 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 65 },
    { day: 'Sat', value: 30 },
    { day: 'Sun', value: 85 }
  ]);

}
