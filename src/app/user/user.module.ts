import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

import { PToastModule } from '../shared/components/p-toast/p-toast.module';
import { LoginComponent } from './login/login.component';
import { UserService } from '../shared/services';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    ToastModule,
    PToastModule
  ],
  providers: [UserService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
