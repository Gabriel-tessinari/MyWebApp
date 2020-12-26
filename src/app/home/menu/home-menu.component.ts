import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PToastComponent } from '../../shared/components';
import { UserService } from '../../shared/services';
import { UserJson } from '../../shared/json';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {

  items: MenuItem[];
  user: UserJson = new UserJson();

  constructor(
    private router: Router,
    private pToastComponent: PToastComponent,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Alterar Dados', icon: 'pi pi-refresh', command: () => {
        this.updateUser();
      }},
      {label: 'Deletar Conta', icon: 'pi pi-times', command: () => {
        this.deleteUser();
      }},
      {separator:true},
      {label: 'Logout', icon: 'pi pi-sign-out', command: () => {
        this.logout();
      }}
    ];

    this.user.id = parseInt(localStorage.getItem('userId'));
    this.user.name = localStorage.getItem('userName');
  }

  updateUser() {
    this.pToastComponent.showSuccessCustomMessage('Update', JSON.stringify(this.user), 5000);
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
    localStorage.removeItem('token');
  }
}
