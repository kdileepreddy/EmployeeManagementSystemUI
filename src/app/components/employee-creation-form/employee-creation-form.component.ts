import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeserviceService } from '../../services/employeeservice.service';
import { inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-creation-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule 
    ],
  templateUrl: './employee-creation-form.component.html',
  styleUrl: './employee-creation-form.component.css'
})
export class EmployeeCreationFormComponent implements OnInit {

  employeeForm!: FormGroup;
  pageTitle: string = 'Create New Employee';
  buttonText: string = 'Create';
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmployeeCreationFormComponent>
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hireDate: ['', Validators.required],
      jobTitle: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

   ngOnInit() {
    if (this.data) {
      this.pageTitle = 'Edit Employee';
      this.buttonText = 'Update';
      this.employeeForm.patchValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        hireDate: new Date(this.data.hireDate),
        jobTitle: this.data.jobTitle, 
        salary: this.data.salary
      });
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      if (this.data) {
        // Update existing employee
        formData.employeeId = this.data.employeeId;
        this.dialogRef.close(formData);
      } else {
        // Create new employee
        this.dialogRef.close(formData);
      }
    }
  }

}
