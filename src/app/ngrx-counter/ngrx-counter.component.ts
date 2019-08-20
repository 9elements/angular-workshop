import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { decrement, increment, reset } from '../actions/counter.actions';
import { CounterState } from '../reducers/counter.reducer';
import { AppState } from '../shared/app-state';
import { selectCounter } from '../shared/selectors';

@Component({
  selector: 'app-ngrx-counter',
  templateUrl: './ngrx-counter.component.html',
  styleUrls: ['./ngrx-counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgRxCounterComponent {

  count$: Observable<CounterState>;

  constructor(private store: Store<AppState>) {
    this.count$ = store.pipe(select(selectCounter));
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
