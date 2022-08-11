import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { CounterComponent } from './components/counter/counter.component';
import { HomeComponent } from './components/home/home.component';
import {
  NgRxCounterComponent,
} from './components/ngrx-counter/ngrx-counter.component';
import {
  ServiceCounterComponent,
} from './components/service-counter/service-counter.component';
import {
  StandaloneServiceCounterComponent,
} from './components/standalone-service-counter/standalone-service-counter.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'counter-component', component: CounterComponent },
  { path: 'service-counter-component', component: ServiceCounterComponent },
  { path: 'standalone-service-counter-component', component: StandaloneServiceCounterComponent },
  { path: 'ngrx-counter-component', component: NgRxCounterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
