import { ChangeDetectorRef, Component } from '@angular/core';
import { Authservice } from '../../services/authservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = "";
  password = "";
  constructor(private auth: Authservice, private router: Router, private cdr: ChangeDetectorRef) { }
  login() {
    const data = {
      username: this.username,
      password: this.password
    };

    this.auth.login(data).subscribe({
      next: (res: any) => {
        localStorage.setItem('role', res.role);
        this.auth.setUser(res.data); // store employee list
        this.cdr.detectChanges();
        if (res.role === 'Admin' || res.role === 'HR') {
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/employee']);
        }
      },
      error: (err) => {
        alert("Invalid Login");
      }
    });
  }
  register() {
    this.router.navigate(['/register']);
  }
  forgetPassword() {
    this.router.navigate(['/forget-password']);
  }

}
