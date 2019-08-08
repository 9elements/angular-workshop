import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CounterState } from '../reducers/counter.reducer';
import { AppState } from '../shared/app-state';
import { increment, decrement, reset } from '../actions/counter.actions';

@Component({
  selector: 'app-ngrx-counter',
  templateUrl: './ngrx-counter.component.html',
  styleUrls: ['./ngrx-counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgRxCounterComponent {

  count$: Observable<CounterState>;

  constructor(private store: Store<AppState>) {
    this.count$ = store.pipe(select('counter'));
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset(countString: string) {
    const count = parseInt(countString, 10);
    if (!Number.isNaN(count)) {
      this.store.dispatch(reset({ count }));
    }
  }

}
