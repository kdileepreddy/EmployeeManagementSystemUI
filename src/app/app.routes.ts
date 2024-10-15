import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './Layout/app-layout/app-layout.component';
import { NgModule } from '@angular/core';
import { EmployeeDataGridComponent } from './components/employee-data-grid/employee-data-grid.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent
       
    }
];