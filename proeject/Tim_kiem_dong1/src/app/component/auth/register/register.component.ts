import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    if (this.password !== this.confirmPassword) {
      Swal.fire('Lỗi', 'Mật khẩu không khớp', 'error');
      return;
    }

    const data = {
      name: this.fullName,
      email: this.email,
      password: this.password,
    };

    this.authService.register(data).subscribe({
      next: (res) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Đăng ký thành công!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        if (err.status === 400) {
          Swal.fire('Lỗi đăng ký', 'Email đã được sử dụng', 'error');
        } else {
          Swal.fire('Lỗi', 'Đăng ký không thành công', 'error');
        }
      }
    });
  }
}
