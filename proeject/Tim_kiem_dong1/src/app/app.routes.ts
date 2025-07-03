import { Routes } from '@angular/router';

import { LoginComponent } from './component/auth/login/login.component';
import { AuthComponent } from './component/auth/auth.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ParaCurrencyRateListComponent } from './component/admin/para-currency-rate/para-currency-rate-list/para-currency-rate-list.component';
import { ParaCurrencyRateCreateComponent } from './component/admin/para-currency-rate/para-currency-rate-create/para-currency-rate-create.component';
import { ParaCurrencyRateEditComponent } from './component/admin/para-currency-rate/para-currency-rate-edit/para-currency-rate-edit.component';
import { AdminComponent } from './component/admin/admin.component';
import { HomeComponent } from './component/home/home.component';
import { ErrorComponent } from './component/error/error.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AcountComponent } from './component/admin/acount/acount.component';
import { RoleComponent } from './component/admin/role/role.component';
import { AuthGuard } from './services/auth.guard';


export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: {
        only: ['ROLE_ADMIN', 'ROLE_STAFF'],
      
      }
    },
    children: [
      {
        path: 'acount',
        component: AcountComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: {
               only: ['ROLE_ADMIN', 'ROLE_STAFF'],
              
          }
        }
      },
      {
        path: 'role',
        component: RoleComponent
      },
      {
        path: 'currency/list', component: ParaCurrencyRateListComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: {
               only: ['ROLE_ADMIN', 'ROLE_STAFF'],
              redirectTo:'/admin/currency/list'
          }
        }
      },
      {
        path: 'currency/create', component: ParaCurrencyRateCreateComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: {
                only: ['ROLE_ADMIN', 'ROLE_STAFF'],
          }
        }
      },
      {
        path: 'currency/edit', component: ParaCurrencyRateEditComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: {
              only: ['ROLE_ADMIN', 'ROLE_STAFF'],
           
          }
        }
      },
    ]
  },


  { path: 'home', component: HomeComponent },

  { path: '403', component: ErrorComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },




];
