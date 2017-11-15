import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Decrement, Increment, Reset } from '../actions/counter.actions';
import { CounterState } from '../reducers/counter.reducer';
import { AppState } from '../shared/app-state';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {

  counter: Observable<CounterState>;

  constructor(private store: Store<AppState>) {
    this.counter = store.select('counter');
  }

  increment() {
    this.store.dispatch(new Increment());
  }

  decrement() {
    this.store.dispatch(new Decrement());
  }

  reset(resetNumber: string) {
    const number = parseInt(resetNumber, 10);
    if (!isNaN(number)) {
     this.store.dispatch(new Reset(number));
    }
  }

}
