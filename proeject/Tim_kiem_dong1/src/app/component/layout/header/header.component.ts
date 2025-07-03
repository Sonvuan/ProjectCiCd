import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';  // Import OnInit
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.services';
import Swal from 'sweetalert2';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxPermissionsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sidebarOpen = false;
  name: string = '';
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router,
    private ngxPermissionsService: NgxPermissionsService
  )
     { }


  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.load();
    }

  }

  load() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.name = user.name || null;
      
      } catch (e) {
        console.error('Lỗi parse user từ localStorage:', e);
      }
    }
  }


  logout() {
    Swal.fire({
      title: 'Đăng xuất?',
      text: 'Bạn có chắc chắn muốn đăng xuất?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Hủy',
    }).then(result => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe({
          next: () => {
            this.router.navigate(['/auth/login']);
          },
          error: (err) => {
            console.error('Lỗi khi đăng xuất:', err);
          },
        });
      }
    });
    localStorage.removeItem('user');
  }

}
