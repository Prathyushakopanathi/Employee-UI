import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private apiUrl = "https://localhost:7102/api/Auth";
  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  userData: any;

  setUser(data: any) {
    this.userData = data;
    localStorage.setItem("userData", JSON.stringify(data));
  }

  getUser() {
    if (this.userData) {
      return this.userData;
    }
    const stored = localStorage.getItem("userData");
    if (stored) {
      this.userData = JSON.parse(stored);
      return this.userData;
    }
    return null;
  }
forgetPassword(email: string) {
  return this.http.post<any>(
    `${this.apiUrl}/forgot-password`,{ email });
}

resetPassword(token: string, newPassword: string) {
  return this.http.post<any>(
    `${this.apiUrl}/reset-password`,
    {
      token,
      newPassword
    }
  );
}
}


