import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ParaCurrencyRateService } from '../../../../services/para-currency-rate.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-para-currency-rate-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './para-currency-rate-edit.component.html',
  styleUrls: ['./para-currency-rate-edit.component.css']
})
export class ParaCurrencyRateEditComponent implements OnInit {
  id!: number;
  para: any = {};
  errorMsg = '';
  submitted = false;
  countryList: any[] = [];
  constructor(
    private paraService: ParaCurrencyRateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.load();
    this.getAll();
  }


  load() {
    const stateData = history.state?.data;

    if (!stateData || !stateData.id) {
      this.router.navigate(['/admin/list']);
      return;
    }
    this.para = stateData;
    this.id = stateData.id;
  }

  getAll() {
    const list = {};
    this.paraService.getAll(list).subscribe({
      next: (data) => {
       this.countryList = data;
  
      },
      error: (error) => {
        console.error('Error fetching data', error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Lỗi khi tải dữ liệu!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  }

  onSubmit(paraForm: NgForm) {
    this.submitted = true;
    if (paraForm.invalid) return;
    this.paraService.update(this.para).subscribe({
      next: () => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Sửa thành công!',
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
          title: 'Lỗi khi sửa dữ liệu!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  }

  backForm(): void {
    this.router.navigate(['/admin/currency/list']);
  }

} 