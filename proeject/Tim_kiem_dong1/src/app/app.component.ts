import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './component/layout/header/header.component';
import { FooterComponent } from './component/layout/footer/footer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthComponent } from './component/auth/auth.component';
import { NgxPermissionsService } from 'ngx-permissions';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  constructor(
    private ngxPermissionsService: NgxPermissionsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem('user');
       if (userJson) {
        const user = JSON.parse(userJson);
        const roles: string[] = user.role || [];
        const permissions: string[] = user.permission || [];

        this.ngxPermissionsService.loadPermissions([...roles, ...permissions]);
      }
    }
  }
}