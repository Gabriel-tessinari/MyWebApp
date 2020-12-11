import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'p-toast-component',
  template: `
    <p-toast></p-toast>
    `,
})
export class PToastComponent {

  constructor(private messageService: MessageService) { }

  showSuccessDefaultMessage() {
    this.messageService.add({
        severity: 'success', 
        summary: 'Sucesso!', 
        detail: 'Operação realizada com sucesso!'
    });
  }

  showSuccessCustomMessage(summary: string , detail: string, life: number) {
    this.messageService.add({
        severity: 'success', 
        summary: summary, 
        detail: detail, 
        life: life
    });
  }

  showErrorDefaultMessage() {
    this.messageService.add({
        severity: 'error', 
        summary: 'Ops!', 
        detail: 'Desculpe. Ocorreu um erro ao processar sua solicitação.', 
        sticky: true
    });
  }

  showErrorCustomMessage(summary: string , detail: string) {
    this.messageService.add({
        severity: 'error', 
        summary: summary, 
        detail: detail, 
        sticky: true
    });
  }

  showWarningCustomMessage(summary: string , detail: string) {
    this.messageService.add({
        severity:'warn', 
        summary: summary, 
        detail: detail, 
        life: 6000
    });
  }

  showApiError(error: any) {
    console.error(error);
    if(error.status === 422) {
      error.error.forEach(e => this.showWarningCustomMessage('Atenção!', e.message));
    } else {
      this.showErrorDefaultMessage();
    }
  }
}
