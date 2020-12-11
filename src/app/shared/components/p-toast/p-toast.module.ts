import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { PToastComponent } from './p-toast.component';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [ToastModule],
  declarations: [PToastComponent],
  providers: [
    PToastComponent,
    MessageService
  ],
  entryComponents: [PToastComponent],
  exports: [PToastComponent]
})
export class PToastModule { }
