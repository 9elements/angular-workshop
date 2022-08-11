import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
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
import { CounterEffects } from './effects/counter.effects';
import { reducers } from './reducers';
import { CounterApiService } from './services/counter-api.service';
import { CounterService } from './services/counter.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    ServiceCounterComponent,
    NgRxCounterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    AppRoutingModule,
    StandaloneServiceCounterComponent,

    // NgRx Store
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),

    // NgRx Effects
    EffectsModule.forRoot([CounterEffects]),

    // NgRx Store Dev Tools
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last n states
      logOnly: environment.production,
    }),
  ],
  providers: [CounterService, CounterApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
