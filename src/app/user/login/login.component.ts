import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PToastComponent } from '../../shared/components/p-toast/p-toast.component';
import { UserJson } from '../../shared/json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: UserForm = new UserForm();
  user = {} as UserJson;
  
  constructor(
    private pToastComponent: PToastComponent
  ) { }

  ngOnInit(): void { 
    this.userForm.clean();
  }

  login() {
    if(!this.userForm.formValidation()) {
      this.pToastComponent.showErrorCustomMessage('Erro', 'Dados inválidos.');
      return;
    }
    this.pToastComponent
    .showSuccessCustomMessage('Sucesso', JSON.stringify(this.userForm.email), 10000);
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
    return (this.email != "" && this.email != null && this.password != "" && this.password != null);
  }
}