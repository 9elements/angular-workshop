import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CounterEffects } from './effects/counter.effects';
import { IndependentCounterComponent } from './independent-counter/independent-counter.component';
import { NgRxCounterComponent } from './ngrx-counter/ngrx-counter.component';
import { reducers } from './reducers';
import { ServiceCounterComponent } from './service-counter/service-counter.component';
import { CounterService } from './services/counter.service';

// RxJS class methods and instance methods (operators)
@NgModule({
  declarations: [
    AppComponent,
    IndependentCounterComponent,
    ServiceCounterComponent,
    NgRxCounterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,

    // NgRx Store
    StoreModule.forRoot(reducers),

    // NgRx Effects
    EffectsModule.forRoot([
      CounterEffects
    ]),

    // NgRx Store Dev Tools
    StoreDevtoolsModule.instrument({
      maxAge: 25 // Retains last n states
    })
  ],
  providers: [
    CounterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
