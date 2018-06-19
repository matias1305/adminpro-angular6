import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

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
      GraficosDonaComponent
   ],
   exports: [
      PagesComponent,
      DashboardComponent,
      ProgressComponent,
      Graficas1Component
   ],
   imports: [
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      ChartsModule
   ]
})
export class PagesModule { }