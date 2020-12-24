import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeMenuComponent } from './menu/home-menu.component';

const routes: Routes = [
  { path: 'home', component: HomeMenuComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
