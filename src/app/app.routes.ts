import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './Layout/app-layout/app-layout.component';
import { NgModule } from '@angular/core';
import { EmployeeDataGridComponent } from './components/employee-data-grid/employee-data-grid.component';

export const routes: Routes = [
    {
        path: '',
        component: EmployeeDataGridComponent,
       
    }
];