import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PToastComponent } from '../../shared/components';
import { UserService } from '../../shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: UserForm = new UserForm();

  constructor(
    private router: Router,
    private pToastComponent: PToastComponent,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm.clean();
  }

  register() {
    if(!this.userForm.formValidation()) {
      this.pToastComponent.showErrorCustomMessage('Erro', 'Dados inválidos.');
      return;
    }

    if(!this.userForm.passwordConfirmation()) {
      this.pToastComponent.showWarningCustomMessage('Ops!', 'Deve-se digitar a mesma senha no campo Confirmar Senha.');
      return;
    }

    this.router.navigate(['/user/login']);
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
