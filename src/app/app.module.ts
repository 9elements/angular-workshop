import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { CounterEffects } from './effects/counter.effects';
import { CounterComponent } from './counter/counter.component';
import { NgRxCounterComponent } from './ngrx-counter/ngrx-counter.component';
import { reducers } from './reducers';
import { ServiceCounterComponent } from './service-counter/service-counter.component';
import { CounterApiService } from './services/counter-api.service';
import { CounterService } from './services/counter.service';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    ServiceCounterComponent,
    NgRxCounterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

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
