import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-header',
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
