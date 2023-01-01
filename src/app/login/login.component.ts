// le code de cette page provient de : https://apcpedagogie.com/formulaire-dauthentification-2-avec-angular/ ; site sure lequel je 
//me suis appuyé pour réaliser le formulaire d'authentification


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { AuthService } from  '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted  =  false;
  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder ) { }
    ngOnInit() {
      this.loginForm  =  this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
  }
  get formControls() { return this.loginForm.controls; }
  seConnecter(){
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.authentifier(this.loginForm.value);
    this.router.navigateByUrl('/');
  }

}
