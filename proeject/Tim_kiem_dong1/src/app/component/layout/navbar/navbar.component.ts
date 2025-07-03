import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  sidebarOpen = false; 

   constructor(private authService: AuthService, private router: Router) { }
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

  }
}
