import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
;
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ParaCurrencyRateService } from '../../../../services/para-currency-rate.service';

@Component({
  selector: 'app-para-currency-rate-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './para-currency-rate-create.component.html',
  styleUrls: ['./para-currency-rate-create.component.css']
})
export class ParaCurrencyRateCreateComponent implements OnInit {
  para = {
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
    jsonData: ''
  };

  countryList: any[] = [];
  saved = false;
  errorMsg = '';
  submitted = false;

  constructor(
    private paraService: ParaCurrencyRateService,
    private router: Router,
  ) { }

  ngOnInit(): void { 
    this.getAll();
  }


  getAll() {
    const list = {};
    this.paraService.getAll(list).subscribe({
      next: data => {
        console.log(data);
        this.countryList = data;
      },
      error: () => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Load danh sách thất bại!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  }

  onSubmit(paraform: NgForm) {
    this.submitted = true;
    if (paraform.invalid) {
      return;
    }
    this.paraService.create(this.para).subscribe({
      next: () => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',

          title: 'Thêm mới thành công!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        this.router.navigate(['/admin/currency/list']);
      },
      error: () => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Lỗi khi thêm mới dữ liệu!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  }

  backForm() {
    this.router.navigate(['/admin/currency/list']);
  }
}