import { ChangeDetectorRef, Component } from '@angular/core';
import { Employeeservice } from '../../services/employeeservice';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-employee.html',
  styleUrl: './view-employee.css',
})
export class ViewEmployee {

  employee: any = null;
  constructor(private service: Employeeservice, private router: ActivatedRoute, private route: Router, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.service.getEmployees(id).subscribe({
      next: (data: any) => {
        this.employee = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  BacktoPage() {
    this.route.navigate(['/admin']);
  }

}
