import { RouterModule, Routes } from '@angular/router';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

// Guard
import { LoginGuard } from '../services/service.index';


const PagesRoute: Routes = [
   { 
      path: '',
      component: PagesComponent,
      canActivate: [ LoginGuard ],
      children: [
         { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
         { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
         { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas 1'} },
         { path: 'promesas', component: PromesasComponent , data: {titulo: 'Promesas'}},
         { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'} },
         { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de usuario'} },
         { path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },
         { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
      ] 
   }
];

export const PAGES_ROUTES = RouterModule.forChild(PagesRoute);