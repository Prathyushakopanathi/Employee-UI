import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../../services/authservice';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {
  email: string = '';

  constructor(
    private authService: Authservice,
    private router: Router
  ) {}

  sendResetLink() {
    if (!this.email) {
      alert('Please enter email');
      return;
    }

    this.authService.forgetPassword(this.email).subscribe({
      next: (res: any) => {
        alert(res.message);

        const token = res.link.split('token=')[1];

        this.router.navigate(['/reset-password'], {
          queryParams: { token }
        });
      },
      error: (err) => {
        alert(err.error);
      }
    });
  }
}