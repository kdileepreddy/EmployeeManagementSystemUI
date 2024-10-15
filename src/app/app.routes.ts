import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './Layout/app-layout/app-layout.component';
import { NgModule } from '@angular/core';
import { EmployeeDataGridComponent } from './components/employee-data-grid/employee-data-grid.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'registration',
        component: RegistrationPageComponent
    },
    {
        path: 'dashboard',
        component: AppLayoutComponent,
        children: [
            {
                path: '',
                component: EmployeeDataGridComponent
            }
        ]
    },

];