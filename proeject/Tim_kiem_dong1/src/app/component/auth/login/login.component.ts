import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.services';
import Swal from 'sweetalert2';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions'; // Thêm import cho NgxPermissionsModule


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent   {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngxPermissionsService: NgxPermissionsService
  ) { }

submit() {
  const userData = {
    email: this.email,
    password: this.password,
  };

  this.authService.login(userData).subscribe({
    next: (response) => {
      console.log('Login response:', response);
      if (response && response.token) {

        const flatPermissions: string[] = [];

        if (response.permission && typeof response.permission === 'object') {
          for (const role in response.permission) {
            flatPermissions.push(role); // thêm ROLE_STAFF, ROLE_USER
            flatPermissions.push(...response.permission[role]); // thêm VIEW, EDIT,...
          }
        }

        // 🔄 Ghi đè lại response.permission thành array để AuthGuard dùng được
        response.permission = flatPermissions;

        // Lưu localStorage
        localStorage.setItem('user', JSON.stringify(response));

        // Load quyền cho ngx-permissions
        this.ngxPermissionsService.loadPermissions(response.role.concat(flatPermissions));

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Đăng nhập thành công!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });

        // Điều hướng
        if (response.role.includes('ROLE_ADMIN') || response.role.includes('ROLE_STAFF')) {
          this.router.navigate(['/admin/currency/list']);
        } else if (response.role.includes('ROLE_USER')) {
          this.router.navigate(['/home']);
        } else {
          Swal.fire('Lỗi', 'Tài Khoản chưa có trong hệ thống', 'error');
        }
      } else {
        Swal.fire('Lỗi', 'Đăng nhập không thành công', 'error');
      }
    },
    error: (err) => {
      if (err.status === 401) {
        Swal.fire('Lỗi đăng nhập', 'Email hoặc mật khẩu không đúng', 'error');
      } else if (err.status === 403) {
        Swal.fire('Lỗi Token', 'Không Có token ', 'error');
      }
    }
  });
}



}
