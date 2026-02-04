import { Component, computed, inject, input } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormService } from '../../core/services/dynamic-form-service/dynamic-form-service';


import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, FormField, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicForm {

  config = input.required<any[]>();
  private dynamicFormService = inject(DynamicFormService);

  // 1. Keep your existing computed form
  protected readonly myForm = computed(() => 
    this.dynamicFormService.createFormFromConfig(this.config())
  );

  // 2. Add this getter to fix TS2339 - it casts the tree to any
  protected get f(): any {
    return this.myForm();
  }

  // 3. Update the submit logic using the getter
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.f.valid()) { 
      console.log('Form Submitted:', this.f.value());
    } else {
      console.log('Form is invalid');
    }
  }

  // 4. Helper for individual fields
  getField(name: string): any {
    return (this.myForm() as any)[name];
  }
}
