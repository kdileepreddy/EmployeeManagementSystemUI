import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { EmployeeserviceService } from '../../services/employeeservice.service';
import { tap } from 'rxjs/operators'; // Import tap operator from RxJS
import { Employee } from '../../Interfaces/employee';
import { inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GridApi } from 'ag-grid-community';
import { GridReadyEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeCreationFormComponent } from '../employee-creation-form/employee-creation-form.component';

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
  private employeeService: EmployeeserviceService;
  pagination = true;
  paginationPageSize = 10  ;
  paginationPageSizeSelector = [10, 20, 50, 100];
  private gridApi!: GridApi;

  constructor(private dialog: MatDialog) {
    this.employeeService = inject(EmployeeserviceService);
  }

  ngOnInit() {
    this.loadEmployees();
  }
  
    colDefs: ColDef[] = [
      { 
        field: 'action', 
        headerName: 'Action', 
        cellRenderer: (params: any) => {
          const updateBtn = document.createElement('button');
          updateBtn.innerHTML = 'Update';
          updateBtn.classList.add('btn', 'btn-primary', 'btn-sm', 'me-2');
          updateBtn.style.cssText = 'font-size: 12px;background-color: #202427; color: #fff;';
          updateBtn.addEventListener('click', () => {
            const dialogRef = this.dialog.open(EmployeeCreationFormComponent, {
              width: '800px',   
              
              data: { ...params.data }
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                this.updateEmployee(params.data.employeeId, result);
              }
            });
          });

          const deleteBtn = document.createElement('button');
          deleteBtn.innerHTML = 'Delete';
          deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
          deleteBtn.style.cssText = 'font-size: 12px; background-color: #202427; color: #fff;';
          deleteBtn.addEventListener('click', () => {
            this.deleteEmployee(params.data.employeeId);
          });

          const container = document.createElement('div');
          container.style.display = 'flex';
          container.style.justifyContent = 'center';
          container.style.alignItems = 'center';
          container.style.gap = '10px';
          container.appendChild(updateBtn);
          container.appendChild(deleteBtn);
          return container;
        },
        flex: 2
      },
      { field: 'employeeId', headerName: 'ID', filter: true, sortable: true, floatingFilter: true, flex: 2 },
      { field: 'firstName', headerName: 'First Name', filter: true, sortable: true, floatingFilter: true, flex: 2 },
      { field: 'lastName', headerName: 'Last Name', filter: true, sortable: true, floatingFilter: true, flex: 2 },
      { field: 'email', headerName: 'Email', filter: true, sortable: true, floatingFilter: true, flex: 2 },
      { field: 'hireDate', headerName: 'Hire Date', filter: true, sortable: true, floatingFilter: true, flex: 2 },
      { field: 'jobTitle', headerName: 'Job Title', filter: true, sortable: true, floatingFilter: true, flex: 2 },
      { field: 'salary', headerName: 'Salary', filter: true, sortable: true, floatingFilter: true, flex: 2 },
    ];
  

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.rowData = employees;
        this.refreshGrid();
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  private refreshGrid() {
    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.rowData);
    }
  }

  createEmployee(employee: any) {
    this.employeeService.createEmployee(employee).subscribe({
      next: (response) => {
        console.log('Employee created successfully:', response);
        this.loadEmployees(); // Reload the grid after creating
        alert('Employee created successfully');
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
        this.loadEmployees()
        alert('Employee details updated successfully');
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
        // Show a success alert
        this.loadEmployees(); // Reload the grid after deleting
        alert('Employee deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
      }
    });
  }
  
  openAddEmployeeDialog() {
    const dialogRef = this.dialog.open(EmployeeCreationFormComponent, {
      width: '800px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createEmployee(result);
      }
    });
  }

  private formatHeaderName(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
  }
}
