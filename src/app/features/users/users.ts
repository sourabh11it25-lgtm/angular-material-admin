import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';

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
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule, MatSortModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  
  displayedColumns: string[] = ['id', 'name', 'email', 'role'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}