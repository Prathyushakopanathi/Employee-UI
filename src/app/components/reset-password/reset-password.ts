import { Component } from '@angular/core';
import { Authservice } from '../../services/authservice';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone:true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  token = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private route: ActivatedRoute,
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  changePassword() {
    if (!this.newPassword || !this.confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.resetPassword(this.token, this.newPassword)
      .subscribe({
        next: (res: any) => {
          alert(res.message);
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert(err.error);
        }
      });
  }

}
