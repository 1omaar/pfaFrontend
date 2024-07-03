// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../Service/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private toastrService: ToastrService,
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
            this.authService.login(response.jwt);
            this.toastrService.success('Connexion réussie!', 'Succès');
            this.router.navigateByUrl("/");
          } else {
            this.toastrService.error('Identifiants invalides.', 'Erreur');
          }
        },
        (error) => {
          console.error(error);
          this.toastrService.error('Échec de la connexion. Veuillez réessayer.', 'Erreur');
        }
      );
    } else {
      this.toastrService.warning('Veuillez remplir correctement le formulaire.', 'Avertissement');
    }
  }
}
