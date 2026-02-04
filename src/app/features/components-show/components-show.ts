import { Component, inject, OnInit, signal } from '@angular/core';
import { StatCard, Button, Table } from '../../shared/components';
import { ConfigService } from '../../core/services/config-service/config-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InputField } from '../../shared/components/input-field/input-field';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-components-show',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    StatCard,
    Table,
    Button,
    InputField,
  ],
  templateUrl: './components-show.html',
  styleUrl: './components-show.scss',
})
export class ComponentsShow implements OnInit {

  private configService = inject(ConfigService);
  private fb = inject(FormBuilder);
  
  public config = this.configService.config;
  public form!: FormGroup;

  ngOnInit() {
    this.configService.loadConfig();
    
    // Initialize the form
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    });
  }

  // <--- ADD THIS METHOD (Fixes Error TS2339)
  handleAction(id: string) {
    console.log('Action clicked for ID:', id);
  }

   userFormConfig = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' }
  ];
}
