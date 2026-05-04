import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employeeservice } from '../../services/employeeservice';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {

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
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.log(err);
        alert("Unable to add employee");
      }
    });
  }
  cancel() {
    this.router.navigate(['/admin']);
  }
}