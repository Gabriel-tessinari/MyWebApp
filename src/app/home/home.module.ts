import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { PToastModule } from '../shared/components/p-toast/p-toast.module';
import { HomeMenuComponent } from './menu/home-menu.component';
import { UserService } from '../shared/services';

@NgModule({
  declarations: [HomeMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ToolbarModule,
    SplitButtonModule,
    ButtonModule,
    ToastModule,
    PToastModule
  ],
  providers: [UserService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
