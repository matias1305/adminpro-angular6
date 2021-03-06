import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Plugins
import { ChartsModule } from 'ng2-charts';

// Temporales
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficosDonaComponent } from '../components/graficos-dona/graficos-dona.component';

@NgModule({
   declarations: [
      PagesComponent,
      DashboardComponent,
      ProgressComponent,
      Graficas1Component,
      IncrementadorComponent,
      GraficosDonaComponent,
      AccountSettingsComponent,
      PromesasComponent,
      RxjsComponent,
      ProfileComponent
   ],
   exports: [
      PagesComponent,
      DashboardComponent,
      ProgressComponent,
      Graficas1Component
   ],
   imports: [
      CommonModule,
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      ChartsModule,
      PipesModule
   ]
})
export class PagesModule { }