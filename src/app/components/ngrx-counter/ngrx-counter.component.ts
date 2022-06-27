import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { decrement, increment, reset } from '../../actions/counter.actions';
import { CounterState } from '../../reducers/counter.reducer';
import { AppState } from '../../shared/app-state';
import { selectCounter } from '../../shared/selectors';

@Component({
  selector: 'app-ngrx-counter',
  templateUrl: './ngrx-counter.component.html',
  styleUrls: ['./ngrx-counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgRxCounterComponent {
  public count$: Observable<CounterState>;

  constructor(private store: Store<AppState>) {
    this.count$ = store.pipe(select(selectCounter));
  }

  public increment(): void {
    this.store.dispatch(increment());
  }

  public decrement(): void {
    this.store.dispatch(decrement());
  }

  public reset(newCount: string): void {
    const count = parseInt(newCount, 10);
    if (!Number.isNaN(count)) {
      this.store.dispatch(reset({ count }));
    }
  }
}
