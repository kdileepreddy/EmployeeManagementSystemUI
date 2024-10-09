import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreationFormComponent } from './employee-creation-form.component';

describe('EmployeeCreationFormComponent', () => {
  let component: EmployeeCreationFormComponent;
  let fixture: ComponentFixture<EmployeeCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCreationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
