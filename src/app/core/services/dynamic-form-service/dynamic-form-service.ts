// src/app/core/services/dynamic-form.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
// Correct imports for Angular 21 Signal Forms
import { form, required, email, minLength } from '@angular/forms/signals'; 

@Injectable({ providedIn: 'root' })

export class DynamicFormService {
  
  private http = inject(HttpClient);
  createFormFromConfig(config: any[]) {
    // 1. Create the base model signal
    const initialData = config.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {} as any);
    
    const model = signal(initialData);

    // 2. Create the Form Field Tree using the form() function
    // We pass the model and a schema function for validation
    return form(model, (path: any) => {
      config.forEach(field => {
        const fieldPath = path[field.name];
        
        if (field.validators?.required) {
          required(fieldPath, { message: 'This field is required' });
        }
        if (field.validators?.email) {
          email(fieldPath, { message: 'Invalid email address' });
        }
        if (field.validators?.minLength) {
          minLength(fieldPath, field.validators.minLength, { 
            message: `Minimum ${field.validators.minLength} characters required` 
          });
        }
      });
    });
  }
}
