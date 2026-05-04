import { Routes } from '@angular/router';
import { Employee } from './components/employee/employee';
import { Admin } from './components/admin/admin';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AddEmployee } from './components/add-employee/add-employee';
import { EditEmployee } from './components/edit-employee/edit-employee';
import { ViewEmployee } from './components/view-employee/view-employee';
import { ForgetPassword } from './components/forget-password/forget-password';
import { ResetPassword } from './components/reset-password/reset-password';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'employee', component: Employee },
  { path: 'admin', component: Admin },
  { path: 'register', component: Register },
  { path: 'add-employee', component: AddEmployee },
  { path: 'edit-employee/:id', component: EditEmployee },
  { path: 'view-employee/:id', component: ViewEmployee },
  { path: 'forget-password', component: ForgetPassword },
  { path: 'reset-password', component: ResetPassword }

];
