import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PToastComponent } from '../../shared/components';
import { UserService } from '../../shared/services';
import { UserJson } from '../../shared/json';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: UserForm = new UserForm();
  user: UserJson = new UserJson();

  constructor(
    private router: Router,
    private pToastComponent: PToastComponent,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm.clean();
  }

  register() {
    if(!this.userForm.passwordConfirmation()) {
      this.pToastComponent.showWarningCustomMessage('Ops!', 'Deve-se digitar a mesma senha no campo Confirmar Senha.');
      return;
    }

    this.user.name = this.userForm.name;
    this.user.email = this.userForm.email;
    this.user.password = this.userForm.password;

    this.userService.register(this.user).
    subscribe(
      () => {
        this.router.navigate(['/user/login']);
      },
      error => {
        console.error(error);
        this.pToastComponent.showApiError(error);
      }
    );
  }
}

class UserForm {
  name: string;
  email: string;
  password: string;
  passConfirmation: string;

  constructor() {
    this.clean();
  }

  clean() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.passConfirmation = "";
  }

  formValidation(): boolean {
    return (
      this.name != "" && this.name != null && this.name.length >= 3 &&
      this.email != "" && this.email != null && this.email.length >= 5 &&
      this.password != "" && this.password != null && this.password.length >= 5
    );
  }

  passwordConfirmation(): boolean {
    return (this.password == this.passConfirmation);
  }
}
