import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Interfaces/employee';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeserviceService {

  private apiUrl = 'https://employeemanagementsystem-4t3p.onrender.com/api/';

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  private getHeaders() {
    const token = this.authService.AccessToken;
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  }

  // Create a new employee
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}registerEmployee`, employee, this.getHeaders());
  }

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}getAllEmployees`, this.getHeaders());
  }

  // Get a single employee by ID
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}employee/${id}`, this.getHeaders());
  }

  // Update an employee
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}updateEmployee/${id}`, employee, this.getHeaders());
  }

  // Delete an employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}deleteEmployee/${id}`, this.getHeaders());
  }
}
