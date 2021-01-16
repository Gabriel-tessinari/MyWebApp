import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { PToastComponent } from '../../shared/components';
import { UserService } from '../../shared/services';
import { UserJson, ChangePasswordRequestJson } from '../../shared/json';

declare var $: any;

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {

  items: MenuItem[];
  userForm: UserForm = new UserForm();
  user: UserJson = new UserJson();
  changePasswordRequest: ChangePasswordRequestJson = new ChangePasswordRequestJson();
  token: string = localStorage.getItem('token');

  constructor(
    private router: Router,
    private pToastComponent: PToastComponent,
    private confirmationService: ConfirmationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Alterar Dados', icon: 'pi pi-refresh', command: () => {
        this.openModal();
      }},
      {label: 'Deletar Conta', icon: 'pi pi-times', command: () => {
        this.confirmDelete();
      }},
      {separator:true},
      {label: 'Logout', icon: 'pi pi-sign-out', command: () => {
        this.logout();
      }}
    ];

    this.userForm.clean();
    this.initUser();
  }

  initUser() {
    this.user.id = parseInt(localStorage.getItem('userId'));
    this.user.name = localStorage.getItem('userName');
    this.user.email = localStorage.getItem('userEmail');
  }

  updateName() {
    this.initUser();
    this.user.name = this.userForm.name;

    this.userService.update(this.user, this.token).
    subscribe(
      () => {
        this.pToastComponent.showSuccessDefaultMessage();
        this.updateStorage();
        this.userForm.clean();
      },
      error => {
        console.error(error);
        this.pToastComponent.showApiError(error);
      }
    );
  }

  updateEmail() {
    this.initUser();
    this.user.email = this.userForm.email;
    this.user.password = this.userForm.emailPassword;
    
    this.userService.update(this.user, this.token).
    subscribe(
      () => {
        this.pToastComponent.showSuccessDefaultMessage();
        this.updateStorage();
        this.userForm.clean();
      },
      error => {
        console.error(error);
        this.pToastComponent.showApiError(error);
      }
    );
  }

  updatePassword() {
    if(!this.userForm.passwordConfirmation()) {
      this.pToastComponent.showWarningCustomMessage('Ops!', 'Deve-se digitar a mesma nova senha no campo Confirmar Senha.');
      return;
    }

    this.initUser();
    this.user.password = this.userForm.oldPassword;
    this.changePasswordRequest.user = this.user;
    this.changePasswordRequest.newPassword = this.userForm.newPassword;

    this.userService.changePassword(this.changePasswordRequest, this.token).
    subscribe(
      () => {
        this.pToastComponent.showSuccessDefaultMessage();
        this.userForm.clean();
      },
      error => {
        console.error(error);
        this.pToastComponent.showApiError(error);
      }
    );
  }

  openModal(): void {
    $("#updateModal").modal({
      show: true,
      keyboard: false
    });
  }

  confirmDelete(): void {
    this.confirmationService.confirm({
      message: 'Deseja realmente deletar sua conta?',
      header: 'Confirmar Exclusão de Conta',
      icon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-info',
      rejectButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteUser();
      }
    });
  }

  deleteUser() {
    this.userService.delete(this.user.id, this.token).
    subscribe(
      () => {
        this.cleanStorage();
        this.router.navigate(['/user/login']);
      },
      error => {
        console.error(error);
        this.pToastComponent.showApiError(error);
      }
    );
  }

  logout() {
    this.cleanStorage();
    this.router.navigate(['/user/login']);
  }

  cleanStorage() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
  }

  updateStorage() {
    localStorage.setItem('userName', this.user.name);
    localStorage.setItem('userEmail', this.user.email);
  }
}

class UserForm {
  name: string;
  email: string;
  emailPassword: string;
  oldPassword: string;
  newPassword: string;
  passConfirmation: string;

  constructor() {
    this.clean();
  }

  clean() {
    this.name = "";
    this.email = "";
    this.emailPassword = "";
    this.oldPassword = "";
    this.newPassword = "";
    this.passConfirmation = "";
  }

  nameUpdateValidation(): boolean {
    return (this.name != "" && this.name != null && this.name.length >= 3);
  }

  emailUpdateValidation(): boolean {
    return (
      this.email != "" && this.email != null && this.email.length >= 5 &&
      this.emailPassword != "" && this.emailPassword != null && this.emailPassword.length >= 5
    );
  }

  passwordUpdateValidation(): boolean {
    return (
      this.oldPassword != "" && this.oldPassword != null && this.oldPassword.length >= 5 &&
      this.newPassword != "" && this.newPassword != null && this.newPassword.length >= 5
    );
  }

  passwordConfirmation(): boolean {
    return (this.newPassword == this.passConfirmation);
  }
}
