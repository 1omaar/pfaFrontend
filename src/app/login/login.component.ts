// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../Service/jwt.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe(
        (response) => {
          if (response.jwt != null) {
            Swal.fire({
              title: 'Login Successful',
              text: `Welcome, ${response.name}, to your dashboard`,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.authService.login(response.jwt);
              this.router.navigateByUrl("/");
            });
          }
        },
        (error) => {
          Swal.fire({
            title: 'Login Failed',
            text: error.error ? error.error : 'An error occurred during login.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }
}
