import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-dialog',
 standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatOptionModule],
  templateUrl: './user-dialog.html',
  styleUrl: './user-dialog.scss',
})
export class UserDialog implements OnInit {



  public data = inject(MAT_DIALOG_DATA); 
  private dialogRef = inject(MatDialogRef<UserDialog>);
  private fb = inject(FormBuilder);

  userForm = inject(FormBuilder).group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['User', Validators.required]
  });


   ngOnInit() {
    // If data exists, we are in "Edit Mode" -> fill the form
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
  }

  save() {
    // Closes the dialog and returns the form values to the parent
    this.dialogRef.close(this.userForm.value);
  }

}
