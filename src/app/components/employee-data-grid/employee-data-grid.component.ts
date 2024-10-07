import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface


@Component({
  selector: 'app-employee-data-grid',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './employee-data-grid.component.html',
  styleUrl: './employee-data-grid.component.css'
})
export class EmployeeDataGridComponent {
  
  public rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];
 
  public colDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ];
}
