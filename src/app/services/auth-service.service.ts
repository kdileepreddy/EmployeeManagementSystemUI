import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { LoginRequest } from '../Interfaces/LoginRequest';
import { RegistrationRequest } from '../Interfaces/registrationRequest';
import { LoginResponse } from '../Interfaces/LoginResponse';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAuthenticated: boolean = false;
  private currentUser: string | null = null;
  AccessToken: string | null = null;
  private apiUrl = 'https://employeemanagementsystem-4t3p.onrender.com';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const loginRequest: LoginRequest = new LoginRequest(username, password);
    return this.http.post<LoginResponse>( `${this.apiUrl}/login`, loginRequest).pipe(
      map(response => {
        if (response && response.token) {
          this.isAuthenticated = true;
          this.currentUser = username;
          this.AccessToken = response.token;
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  register(formValues: FormGroup): Observable<boolean> {
    const values = formValues.value;
    const registrationRequest: RegistrationRequest = new RegistrationRequest(values.username, values.email, values.password, values.role);
    return this.http.post<RegistrationRequest>(`${this.apiUrl}/register`, registrationRequest).pipe(
      map(response => {
        if (response.username) {
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return of(false);
      })
    );
  }

  
  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.AccessToken = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}
