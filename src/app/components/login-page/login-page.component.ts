import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: '',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: FormControl;
  password: FormControl;

  constructor() {
    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
  }

  onSubmit() {
    if (this.username.valid && this.password.valid) {
      // Implement login logic here
      console.log('Login submitted', {
        username: this.username.value,
        password: this.password.value
      });
    }
  }

}
