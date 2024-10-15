import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent implements OnInit {
  registrationForm!: FormGroup;
  authService = inject(AuthServiceService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMismatchValidator });
  }

  passwordMismatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword!.setErrors({ mismatch: true });
    } else {
      confirmPassword!.setErrors(null);
    }
  }

  private showAlert(message: string, type: 'success' | 'error'): void {
    alert(message);
  }

  onSubmit() {
    if (this.registrationForm.get('password')!.value !== this.registrationForm.get('confirmPassword')!.value) {
      this.registrationForm.get('confirmPassword')!.setErrors({ 'mismatch': true });
    } else {
      this.registrationForm.get('confirmPassword')!.setErrors(null);
      this.authService.register(this.registrationForm.get('username')!.value!, this.registrationForm.get('email')!.value!, this.registrationForm.get('password')!.value!).subscribe(
        (success) => {
          if (success) {
            this.showAlert('Registration successful. Please login.', 'success');
            this.router.navigate(['/login']);
          } else {
            this.showAlert('Registration failed. Please try again.', 'error');
          }
        }
      );
    }
  }         
}
