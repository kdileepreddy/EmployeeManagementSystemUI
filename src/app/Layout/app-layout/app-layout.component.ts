import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidenavContentComponent } from '../../shared/sidenav-content/sidenav-content.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
  standalone: true,
  imports: [
    MatSidenavModule,
    HeaderComponent,
    SidenavContentComponent,
    RouterModule,
    CommonModule    
  ]
})
export class AppLayoutComponent {
  sideBarOpen: boolean = true;
  public sideNavColor: any;
  public content: any;
  public contentCss: any;
  contentMargin: number = 17;
  constructor() {}

  ngOnInit(): void {
    
  }

  sideBarToggler(event: any) {
    this.sideBarOpen = !this.sideBarOpen;
    if(!this.sideBarOpen) {
      this.contentMargin = 7;
    } else {
      this.contentMargin = 17;
    }
  }

}
