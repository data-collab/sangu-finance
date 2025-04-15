import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Adjust API endpoint if necessary

  constructor(private http: HttpClient, private cookies: CookieService) {}

  register(
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
    currencyPreference: string,
    acceptTerms: boolean
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { 
      fullName,
      email, 
      password, 
      confirmPassword, 
      currencyPreference, 
      acceptTerms 
    }, { withCredentials: true });

  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true });
  }

  // Check if the user is authenticated by checking for the token in cookies
  isAuthenticated(): boolean {
    return !!this.cookies.get('token');  // Checks if token exists in cookies
  }

  // Store token in cookies after login
  storeToken(token: string): void {
    this.cookies.set('token', token);
  }

  // Retrieve the token from cookies
  getToken(): string | null {
    return this.cookies.get('token');
  }

  // Remove token from cookies on logout
  logout(): void {
    this.cookies.delete('token');
  }
}
