import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PToastComponent } from '../../shared/components';
import { UserService } from '../../shared/services';
import { LoginResponseJson } from '../../shared/json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: UserForm = new UserForm();
  loginResponse: LoginResponseJson;
  
  constructor(
    private router: Router,
    private pToastComponent: PToastComponent,
    private userService: UserService
  ) { }

  ngOnInit(): void { 
    this.userForm.clean();
  }

  login() {
    if(!this.userForm.formValidation()) {
      this.pToastComponent.showErrorCustomMessage('Erro', 'Dados inválidos.');
      return;
    }

    const emailAndPass = this.userForm.email + ':' + this.userForm.password;
    this.userForm.password = null;
    const encodedAuth = btoa(emailAndPass);
    UserService.AUTH = 'Basic ' + encodedAuth;

    this.userService.login().
    subscribe(
      response => {
        this.loginResponse = response;
        this.router.navigate(['/home']);
      },
      error => {
        console.error(error);
        this.pToastComponent.showApiError(error);
      }
    );
  }
}

class UserForm {
  email: string;
  password: string;

  constructor() {
    this.clean();
  }

  clean() {
    this.email = "";
    this.password = "";
  }

  formValidation(): boolean {
    return (
      this.email != "" && this.email != null && this.email.length >= 5 &&
      this.password != "" && this.password != null && this.password.length >= 5);
  }
}