import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Employeeservice {

  constructor(private http: HttpClient) { }
  private apiUrl = "https://localhost:7102/api/Employee";

  getEmployees(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  updateEmployee(id: number, employee: any) {
    return this.http.put(`${this.apiUrl}/${id}`, employee);
  }
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  addEmployee(employee:any) {
    return this.http.post(`${this.apiUrl}`,employee);
  }
}
