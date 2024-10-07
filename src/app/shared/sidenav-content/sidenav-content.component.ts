import { Component, Input, Renderer2 } from '@angular/core';
import { NavItem } from '../../Interfaces/NavItem';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav-content',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './sidenav-content.component.html',
  styleUrl: './sidenav-content.component.css'
})
export class SidenavContentComponent {
  public theme: any;
  public themeClass: any;
  public accountIcon: any;
  public MatExpansionPanel!: string;
  public themeNavLink: any;
  public themeActiveLink: any;
  public opened:boolean= false;
  public header: any;
  public sideNavTitle: any;
  public sidebarcolor: any;
  @Input() sideBar:boolean = false;
  constructor(
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
  
  }

  menu: NavItem[] = [
    {
      displayName: 'Interesting Facts',
      iconName: 'fact_check',
      route: 'facts',
    },
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: 'dashboard',
    },
    {
      displayName: 'Angular',
      iconName: 'font_download',
      route: 'angularContent',
    },
    {
      displayName: 'Java 8',
      iconName: 'code',
      route: 'Java8',
    },
    {
      displayName: 'Spring Boot',
      iconName: 'code',
      route: 'springboot-content',
    },
    {
      displayName: 'My Applications',
      iconName: 'apps',
      route: 'myApplications',
    },
  ];
  togglePanel():void{
    this.opened=true;
  }

}
