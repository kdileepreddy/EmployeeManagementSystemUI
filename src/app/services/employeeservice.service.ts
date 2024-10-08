import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeserviceService {

  private apiUrl = 'https://employeemanagementsystem-4t3p.onrender.com/api/';

  constructor(private http: HttpClient) { }

  // Create a new employee
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}registerEmployee`, employee);
  }

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}getAllEmployees`);
  }

  // Get a single employee by ID
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}employee/${id}`);
  }

  // Update an employee
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}updateEmployee/${id}`, employee);
  }

  // Delete an employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}deleteEmployee/${id}`);
  }
}
