import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {

  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() icon: string = 'show_chart';
  @Input() themeColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() trend?: string;
  @Input() trendPositive: boolean = true;
}
