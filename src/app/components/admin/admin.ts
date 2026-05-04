import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Authservice } from '../../services/authservice';
import { Router } from '@angular/router';
import { Employeeservice } from '../../services/employeeservice';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  employees: any[] = [];
  user: any;
  userData: any;
  role: string = '';
  constructor(private auth: Authservice, private cdr: ChangeDetectorRef, private router: Router, private service: Employeeservice) { }
  ngOnInit() {
    this.employees = this.auth.getUser();
    this.role = localStorage.getItem('role') || '';
    this.cdr.detectChanges();
  }

  logout() {
    const isConfirm = confirm("Are you sure want to LogOut the Application?");
    if (isConfirm) {
      localStorage.clear();
      this.router.navigate(['']);
    }
    else {
      this.router.navigate(['/admin']);
    }
  }
  addEmployee() {
    this.router.navigate(['/add-employee']);
  }
  getEmployees(id: Number) {
    this.router.navigate(['/view-employee', id]);
  }
  editEmployee(id: number) {
    this.router.navigate(['/edit-employee', id]);
  }
  loadEmployees() {
    this.employees = this.auth.getUser();
  }

  deleteEmployee(id: number) {
    if (confirm("Do you want to delete this employee?")) {
      this.service.deleteEmployee(id).subscribe({
        next: (res: any) => {
          alert(res.message);
          this.employees = this.employees.filter(e => e.id !== id);
          this.cdr.detectChanges();
        },
        error: err => console.log(err)
      });
    }
  }
}
