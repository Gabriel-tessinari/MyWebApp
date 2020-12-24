import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeMenuComponent } from './menu/home-menu.component';
import { AuthGuardService } from '../shared/services';

const routes: Routes = [
  { path: 'home', component: HomeMenuComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
