import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {

  @Input() columns: { key: string, label: string }[] = [];
  @Input() set data(value: any[]) { this.dataSource.data = value; }

  dataSource = new MatTableDataSource<any>([]);
  columnKeys: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges() { this.columnKeys = this.columns.map(c => c.key); }
  ngAfterViewInit() { this.dataSource.paginator = this.paginator; }
}
