import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.services';

declare var bootstrap: any; // nếu bootstrap không có type, tạm khai báo any

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  name: string = '';
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService, private router: Router) { }
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
        this.name = user.name || '';
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
