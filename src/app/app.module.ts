// RxJS class methods and instance methods (operators)
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { CounterEffects } from './effects/counter.effects';
import { reducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
