import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthService } from '../../../services/auth.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acount',
  standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, NgxPaginationModule, NgxPermissionsModule],
  templateUrl: './acount.component.html',
  styleUrl: './acount.component.css'
})
export class AcountComponent implements OnInit {
  list: any[] = [];
  pageSize: number = 5;
  currentPage: number = 0;
  totalElements: number = 0;
  selectedItem: any;
constructor(
    private service: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.load();
  }


  load(page: number = 1, size: number = this.pageSize){
    const data= {

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
    this.load( this.currentPage, this.pageSize);
  }

  
  delete(id?: number) {
      if (!id) return;
      Swal.fire({
        title: 'Bạn có chắc muốn xóa?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
      }).then(result => {
        if (result.isConfirmed) {
          this.service.delete(id).subscribe({
            next: () => {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Xoá thành công!',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
              this.load();
            },
            error: () => {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Xoá thất bại!',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
            }
          });
        }
      });
    }
  
      openDetail(item: any) {
    this.selectedItem = item;

  }

}
