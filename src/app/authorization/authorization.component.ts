import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent {
  public register: boolean = false;
  public login: boolean = true;
  public isVisited!: boolean;

  public signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  
  //First UpperCase, Minimum 1 Number, Minimum 1 Char
  private StrongPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  public RegisterForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.StrongPassword)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    currencyPreference: new FormControl('', [Validators.required]),
    acceptTerms: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  useRegister() {
    this.register = true;
    this.login = false;
    this.isVisited = false;
  }

  useLogin() {
    this.register = false;
    this.login = true;
    this.isVisited = true;
  }

  onLogin() {
    const { email, password } = this.signInForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.authService.storeToken(response.token); // Store token after login
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }

  onRegister() {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      currencyPreference,
      acceptTerms,
    } = this.RegisterForm.value;

    if (password !== confirmPassword) {
      return;
    }

    this.authService
      .register(fullName, email, password, confirmPassword, currencyPreference ,acceptTerms)
      .subscribe({
        next: (response) => {
          console.log('Registration successful:', response);

          // Assuming the backend returns a token in the response
          const token = response.token;
          if (token) {
            this.authService.storeToken(token); // Store token in localStorage
            this.router.navigate(['/home']); // Redirect to home page after registration
          } else {
            console.error('Token not found in response');
          }
        },
        error: (error) => {
          console.error('Registration failed:', error);
          if (
            error.status === 400 &&
            error.error.message === 'User already exists'
          ) {
            // Handle case where user already exists
          } else {
            // Handle other errors
          }
        },
      });
  }

  onLogout() {
    this.authService.logout(); // Clear token on logout
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
