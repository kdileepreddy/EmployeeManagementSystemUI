import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { EmployeeserviceService } from '../../services/employeeservice.service';
import { tap } from 'rxjs/operators'; // Import tap operator from RxJS
import { Employee } from '../../Interfaces/employee';
import { inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee-data-grid',
  standalone: true,
  imports: [AgGridAngular,HttpClientModule], 
  providers: [EmployeeserviceService],
  templateUrl: './employee-data-grid.component.html',
  styleUrl: './employee-data-grid.component.css'
})
export class EmployeeDataGridComponent implements OnInit {

  rowData: Employee[] = [];
  public colDefs: ColDef[] = [];
  private employeeService: EmployeeserviceService;
  pagination = true;
  paginationPageSize = 10  ;
  paginationPageSizeSelector = [10, 20, 50, 100];

  constructor() {
    this.employeeService = inject(EmployeeserviceService);
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        if (employees.length > 0) {
          this.colDefs = Object.keys(employees[0]).map(key => ({
            field: key,
            headerName: this.formatHeaderName(key),
            filter: true,
            sortable: true,
            floatingFilter: true,
            checkboxSelection: true,
          }));
        }
        this.rowData = employees;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        // Handle the error appropriately, e.g., show a user-friendly message
      }
    });
  }

  createEmployee(employee: any) {
    this.employeeService.createEmployee(employee).subscribe({
      next: (response) => {
        console.log('Employee created successfully:', response);
        this.loadEmployees(); // Reload the grid after creating
      },
      error: (error) => {
        console.error('Error creating employee:', error);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    });
  }

  updateEmployee(id: number, employee: any) {
    this.employeeService.updateEmployee(id, employee).subscribe({
      next: (response) => {
        console.log('Employee updated:', response);
        this.loadEmployees(); // Reload the grid after updating
      },
      error: (error) => {
        console.error('Error updating employee:', error);
      }
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        console.log('Employee deleted:', response);
        this.loadEmployees(); // Reload the grid after deleting
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
      }
    });
  }
  

  private formatHeaderName(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
  }
}
