import { ChangeDetectorRef, Component } from '@angular/core';
import { Employeeservice } from '../../services/employeeservice';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css',
})
export class EditEmployee {
  id!: number;
  employee: any = {
    empName: '',
    salary: 0,
    deptName: '',
    role: ''
  }

  constructor(private service: Employeeservice,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private auth: Authservice) { }
  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.service.getEmployees(this.id).subscribe({
      next: (data: any) => {
        this.employee = data;
        this.cdr.detectChanges();
      },
      error: err => console.log(err)
    });
  }
  updateEmployee() {
    this.service.updateEmployee(this.id, this.employee)
      .subscribe({
        next: (res: any) => {
          let users = this.auth.getUser();
          const index = users.findIndex((x: any) => x.id === res.id);
          if (index != -1) {
            users[index] = res;
          }
          this.auth.setUser(users);
          alert("Employee Updated Successfully");
          this.router.navigate(['/admin']);
        },
        error: err => console.log(err)
      });
  }

  BacktoPage() {
    this.router.navigate(['/admin']);
  }
}
