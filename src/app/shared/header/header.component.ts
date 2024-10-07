import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  pageName: string = 'Employee Management System';
  public header: any;
  public search: any;
  public accountButton: any;
  public menuItem: any;
  public divider:any;
  searchFormControl = new FormControl();
  constructor(
    public dialog: MatDialog,
  ) {}
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
   
  }
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
  showPreferencesPopup(): void {
    
  }
}
