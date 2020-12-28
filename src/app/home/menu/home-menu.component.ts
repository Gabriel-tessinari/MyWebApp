import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { PToastComponent } from '../../shared/components';
import { UserService } from '../../shared/services';
import { UserJson } from '../../shared/json';

declare var $: any;

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {

  items: MenuItem[];
  user: UserJson = new UserJson();
  showModal: boolean = false;

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

    this.user.id = parseInt(localStorage.getItem('userId'));
    this.user.name = localStorage.getItem('userName');
    this.user.email = localStorage.getItem('userEmail');
  }

  updateUser() {
    this.pToastComponent.showSuccessCustomMessage('Update', JSON.stringify(this.user), 5000);
  }

  openModal(): void {
    $("#myModal").modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
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
    const token = localStorage.getItem('token');

    this.userService.delete(this.user.id, token).
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
}
