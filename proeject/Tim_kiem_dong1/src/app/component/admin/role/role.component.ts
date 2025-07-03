import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPermissionsModule, NgxRolesService } from 'ngx-permissions';

import { RoleService } from '../../../services/role.services';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.services';


@Component({
  selector: 'app-role',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxPaginationModule, NgxPermissionsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
  providers: [RoleService] // <-- Add this line
})
export class RoleComponent {
  list: any[] = [];
  selectedItem: any;
  currentPage: number = 0;
  pageSize: number = 5;
  isEditing = false;
  isDelete = false;
  totalElements: number = 0;
  availableRoles: any[] = [];
  permissionsOfSelectedRoles: string[] = [];

  selectedRole: string = '';
  selectedPermission: string = '';


  availablePermissions: any[] = [];
  constructor(
    private service1: RoleService,
    private service: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.load();
    this.loadRoles();
  }

  load(page: number = 1, size: number = this.pageSize) {
    const data = {

      page: page - 1,
      size: size,
    }
    this.service.list(data).subscribe({
      next: (response: any) => {
        this.list = response.content;
        this.totalElements = response.totalElements;
        this.currentPage = response.page + 1;
        this.pageSize = response.size;
      }

    });
  }

  pageChanged(event: any) {
    this.currentPage = event;
    this.load(this.currentPage, this.pageSize);
  }
  loadRoles() {
    const data = {};
    this.service1.getAllRole(data).subscribe({
      next: (res) => {
        this.availableRoles = res;
      }
    });
    this.service1.getAllPermission(data).subscribe({
      next: (res) => {
        this.availablePermissions = res;
      },
      error: (err) => {
        console.error('Lỗi khi tải quyền:', err);
      }
    });
  }


  saveAll() {
    this.saveRoleOnly();
    this.savePermission();
  }
  saveRoleOnly() {
    const payload = {
      id: this.selectedItem.id,
      role: this.selectedItem.roles[0]?.name,
    };
    this.service1.update(payload).subscribe({
      next: () => {
        Swal.fire('Thành công', 'Cập nhật vai trò thành công!', 'success');
        this.isEditing = false;
        this.load();
        this.loadRoles();
      },
      error: () => {
        Swal.fire('Lỗi', 'Cập nhật vai trò thất bại!', 'error');
      }
    });
  }

  savePermission() {
    const payload = {
      id: this.selectedItem.id,
      role: this.selectedItem.roles[0]?.name,
      permission: this.selectedItem.permissions[0]?.name
    };
    this.service1.updatePermission(payload).subscribe({
      next: () => {
        Swal.fire('Thành công', 'Cập nhật vai trò thành công!', 'success');
        this.isEditing = false;
        this.load();
        this.loadRoles();
      }
    });
  }




  saveDele() {
    const payload = {
      id: this.selectedItem.id,
      role: this.selectedItem.roles[0]?.name
    };

    this.service1.remove(payload).subscribe({
      next: () => {
        this.isDelete = false;
        this.load();
        this.loadRoles();

        Swal.fire('Thành công', `Đã xoá vai trò `, 'success');
      },
      error: (err) => {
        console.error('Xoá vai trò thất bại:', err);
        Swal.fire('Lỗi', 'Không thể xoá vai trò!', 'error');
      }
    });
  }

  saveDelePermission() {
    const permissionPayload = {
      id: this.selectedItem.id,
      role: this.selectedItem.roles[0]?.name,
      permission: this.selectedItem.permissions[0]?.name
    };
    this.service1.removePermission(permissionPayload).subscribe({
      next: () => {
        this.isDelete = false;
        this.load();
        this.loadRoles();

        Swal.fire('Thành công', `Đã xoá quyền `, 'success');
      },
      error: (err) => {
        console.error('Xoá quyền thất bại:', err);
        Swal.fire('Lỗi', 'Không thể xoá quyền!', 'error');
      }
    });
  }


  getUniquePermissions(item: any): string[] {
    const allPermissions = item.roles
      .flatMap((role: any) => role.permissions.map((perm: any) => perm.name));


    return Array.from(new Set(allPermissions));
  }

  openDetail(item: any) {
    this.selectedItem = item;

  }
}
