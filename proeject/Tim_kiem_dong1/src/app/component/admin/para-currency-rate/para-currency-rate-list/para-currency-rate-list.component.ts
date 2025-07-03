import { Component, OnInit } from '@angular/core';
import { ParaCurrencyRateService } from '../../../../services/para-currency-rate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';



@Component({
  selector: 'app-para-currency-rate-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxPaginationModule, NgxPermissionsModule],
  templateUrl: './para-currency-rate-list.component.html',
  styleUrls: ['./para-currency-rate-list.component.css']
})
export class ParaCurrencyRateListComponent implements OnInit {
  list: any[] = [];

  searchInput: any = {
    currency: '',
    currencyName: '',
    currencyHoliday: '',
    fcPurchase: '',
    fcSale: '',
    cashTransaction: '',
    currencyExchange: '',
    vndGlAccount: '',
    fcGlAccount: '',
    country: '',
    buyingRate: '',
    brCashHigh: '',
    brCashLow: '',
    sellingRate: '',
    intermediateRate: '',
    paraStatus: '',
    activeStatus: '',
    jsonData: '',
    sort: 'desc'
  };


  countryList: any[] = [];
  totalPages = 0;
  totalElements = 0;
  currentPage = 0;
  pageSize = 5;
  goToPageInput = 1;
  isSearching = false;
  deleted = false;
  saved = false;
  edit = false;
  selectedItem: any;
  sort = '';

  constructor(
    private service: ParaCurrencyRateService,
    private router: Router,
    private ngxPermissionsService: NgxPermissionsService
  ) { }

  ngOnInit(): void {
      
    this.loadList();
    // this.search();
    this.getCountry();
   

  }




  loadList(page: number = 1, size: number = this.pageSize) {
    const searchBody = {
      page: page - 1,
      size: size
    };

    this.service.list(searchBody).subscribe({
      next: data => {
        this.list = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = page;
        this.pageSize = size;
      },
      // error: () => {
      //   Swal.fire({
      //     toast: true,
      //     position: 'top-end',
      //     icon: 'error',
      //     title: 'Load danh sách thất bại!',
      //     showConfirmButton: false,
      //     timer: 3000,
      //     timerProgressBar: true
      //   });
      // }
    });
    

  }


  getCountry() {
    const list = {};
    this.service.getAll(list).subscribe({
      next: data => {
        this.countryList = data;
      },
      // error: () => {
      //   Swal.fire({
      //     toast: true,
      //     position: 'top-end',
      //     icon: 'error',
      //     title: 'Load danh sách thất bại!',
      //     showConfirmButton: false,
      //     timer: 3000,
      //     timerProgressBar: true
      //   });
      // }
    });

  }

  // Tìm kiếm động
  search(page: number = 1, size: number = this.pageSize) {
    this.isSearching = true;
    const searchBody = {
      search: this.searchInput,
      sortDirection: this.searchInput.sort || 'DESC',
      page: page - 1,
      size: size
    };
    this.service.findByNav(searchBody).subscribe({
      next: data => {
        console.log("fdsf", data);

        this.list = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = page;
        this.pageSize = size;


      },
      error: err => console.error('Lỗi tìm kiếm:', err),
    });
    // this.service.findByPro(searchBody).subscribe({
    //   next: data => {
    //     this.list = data.content;
    //     this.totalElements = data.totalElements;
    //     this.totalPages = data.totalPages;
    //     this.currentPage = page;
    //     this.pageSize = size;

    //   },
    //   error: err => console.error('Lỗi tìm kiếm:', err),
    // });
    // this.service.findBySpec(searchBody).subscribe({
    //   next: data => {
    //     this.list = data.content;
    //     this.totalElements = data.totalElements;
    //     this.totalPages = data.totalPages;
    //     this.currentPage = page;
    //     this.pageSize = size;

    //   },
    //   error: err => console.error('Lỗi tìm kiếm:', err),
    // });
  }

  // Khi chuyển trang
  pageChanged(event: any) {
    const selectedPage = event.page || event;
    if (this.isSearching) {
      this.search(selectedPage, this.pageSize);
    } else {
      this.loadList(selectedPage, this.pageSize);
    }
  }

  // Khi thay đổi số bản ghi trên trang
  onSizeChange(event: Event) {
    const input = event.target as HTMLInputElement | null;
    const value = input?.value ? Number(input.value) : this.pageSize;
    if (value > 0) {
      this.pageSize = value;
      if (this.isSearching) {
        this.search(1, this.pageSize);
      } else {
        this.loadList(1, this.pageSize);
      }
    } else {
      Swal.fire('Thông báo', 'Số bản ghi mỗi trang phải lớn hơn 0', 'warning');
    }
  }

  // Nhảy đến trang chỉ định
  goToPage() {
    if (!this.goToPageInput || this.goToPageInput < 1 || this.goToPageInput > this.totalPages) {
      Swal.fire('Thông báo', 'Số trang không hợp lệ', 'warning');
      return;
    }
    const selectedPage = this.goToPageInput;
    if (this.isSearching) {
      this.search(selectedPage, this.pageSize);
    } else {
      this.loadList(selectedPage, this.pageSize);
    }
  }

  // Xoá bản ghi
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
            this.loadList(this.currentPage, this.pageSize);
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

  // Chuyển trang thêm mới
  goToAdd() {
    this.router.navigate(['/admin/currency/create']);
  }

  // Chuyển trang sửa
  goToEdit(item: any) {
    this.router.navigate(['/admin/currency/edit'], {
      state: { data: item }
    });
  }

  // Xem chi tiết
  openDetail(item: any) {
    this.selectedItem = item;

  }

  // Reset form tìm kiếm
  reset() {
    this.searchInput = {
      currency: '',
      currencyName: '',
      currencyHoliday: '',
      fcPurchase: '',
      fcSale: '',
      cashTransaction: '',
      currencyExchange: '',
      vndGlAccount: '',
      fcGlAccount: '',
      country: '',
      buyingRate: '',
      brCashHigh: '',
      brCashLow: '',
      sellingRate: '',
      intermediateRate: '',
      paraStatus: '',
      activeStatus: '',
      jsonData: '',
      sort: 'desc'
    };
    this.search(1, this.pageSize);
  }

}