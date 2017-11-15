import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  CHANGED_TYPES,
  CounterAction,
  CounterSaveAction,
  SaveError,
  SavePending,
  SaveSuccess,
} from '../actions/counter.actions';
import { AppState } from '../shared/app-state';

@Injectable()
export class CounterEffects {
  /*
   * Listens for counter changes and sends the state to the server.
   * Dispatches SAVE_PENDING, and SAVE_SUCCESS or SAVE_ERROR.
   */
  @Effect()
  saveOnChange$: Observable<CounterSaveAction> = this.actions$
    .ofType<CounterAction>(...CHANGED_TYPES)
    .withLatestFrom(this.store$)
    .mergeMap(([ action, state ]) =>
      Observable.of(new SavePending())
        .merge(
          this.http.post(
            '/assets/counter.json',
            { counter: state.counter }
          )
          .map((data) => new SaveSuccess())
          .catch((error) => Observable.of(new SaveError(error)))
        )
    );

  constructor(
    private http: Http,
    private actions$: Actions,
    private store$: Store<AppState>
  ) {}
}
