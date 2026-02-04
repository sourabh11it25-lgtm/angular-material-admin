import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserDialog } from './user-dialog/user-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmDialog } from '../../core/components/confirm-dialog/confirm-dialog';
import { ApiService } from '../../core/services/api-service/api-service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { F } from '@angular/cdk/keycodes';

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const ELEMENT_DATA: UserData[] = [
  {id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin'},
  {id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor'},
  {id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'User'},
];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule, MatSortModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatProgressBarModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  private apiService = inject(ApiService);
  isLoading = true;

  ngOnInit() {
    // this.dataSource.sort = this.sort;
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch users', err);
        this.isLoading = false;
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
     this.paginator._intl.itemsPerPageLabel = 'Rows per page:';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  openAddUserDialog() {
    const dialogRef = this.dialog.open(UserDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newUser = {
          id: (this.dataSource.data.length + 1).toString(),
          name: result.name,
          email: result.email,
          role: result.role // <--- Use the role from the dialog result
        };
        this.dataSource.data = [...this.dataSource.data, newUser];
         // 2. Re-link the paginator to force a count recalculation
          this.dataSource.paginator = this.paginator; 
          
          // 3. Go to the last page to see the new user
          setTimeout(() => this.paginator.lastPage(), 100); 
        
        // 3. Show a success message
        this.snackBar.open('User added successfully!', 'OK', { duration: 3000 });
      }
    });
  }


  editUser(user: any) {
  const dialogRef = this.dialog.open(UserDialog, {
    width: '400px',
    data: user // Pass the user object here
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Find the user in the array and update their details
        const index = this.dataSource.data.findIndex(u => u.id === user.id);
        if (index !== -1) {
          const updatedData = [...this.dataSource.data];
          updatedData[index] = { ...user, ...result };
          this.dataSource.data = updatedData;
          this.snackBar.open('User updated!', 'OK', { duration: 2000 });
        }
      }
    });
  }

  deleteUser(user: any) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '500px',
      data: { name: user.name }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        // Perform actual deletion
        this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
        this.snackBar.open('User deleted successfully', 'OK', { duration: 2000 });
      }
    });
  }
}