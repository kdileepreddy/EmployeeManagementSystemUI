import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  private apiUrl = 'https://employeemanagementsystem-4t3p.onrender.com/api/'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  // Create a new employee
  createEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'registerEmployee', employee);
  }

  // Get all employees
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'getAllEmployees');
  }

  // Get a single employee by ID
  getEmployee(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}+'employee'+/${id}`);
  }

  // Update an employee
  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}+'updateEmployee'+/${id}`, employee);
  }

  // Delete an employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}+'deleteEmployee  '+/${id}`);
  }
}
