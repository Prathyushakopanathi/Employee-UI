import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Employeeservice } from '../../services/employeeservice';
import { Router } from '@angular/router';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  employee = {
    id: 0,
    empName: '',
    salary: null,
    deptName: '',
    role: '',
    password: '',
    createdId: null
  };

  constructor(
    private service: Employeeservice,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private auth: Authservice
  ) { }
  saveEmployee() {
    this.service.addEmployee(this.employee).subscribe({
      next: (res: any) => {
        let user = this.auth.getUser();
        if (user) {
          user.push(res);
          this.auth.setUser(user);
        }
        alert("Employee Added Successfully");
        this.router.navigate(['']);
      },
      error: (err) => {
        alert("Unable to add employee");
      }
    });
  }
  cancel() {
    this.router.navigate(['']);
  }
}
