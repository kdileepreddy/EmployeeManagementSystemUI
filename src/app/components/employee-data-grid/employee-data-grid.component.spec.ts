import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataGridComponent } from './employee-data-grid.component';

describe('EmployeeDataGridComponent', () => {
  let component: EmployeeDataGridComponent;
  let fixture: ComponentFixture<EmployeeDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDataGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
