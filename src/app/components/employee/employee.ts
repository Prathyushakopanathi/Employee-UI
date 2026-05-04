import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Authservice } from '../../services/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {
  employee: any[] = [];
  constructor(private auth: Authservice, private router: Router) { }
  ngOnInit() {
    const data = this.auth.getUser();
    this.employee = Array.isArray(data) ? data : [data];
  }
  getEmployees(id: Number) {
    this.router.navigate(['/view-employee', id]);
  }
  logout() {
    localStorage.clear();
    this.router.navigate([''])
  }
}
