import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import {
  decrement,
  increment,
  reset,
  saveError,
  saveSuccess,
} from '../actions/counter.actions';
import { CounterApiService } from '../services/counter-api.service';
import { AppState } from '../shared/app-state';

@Injectable()
export class CounterEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private counterApiService: CounterApiService,
  ) {}

  /*
   * Listens for counter changes and sends the state to the server.
   * Dispatches SAVE_SUCCESS or SAVE_ERROR.
   */
  public saveOnChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(increment, decrement, reset),
      withLatestFrom(this.store$),
      mergeMap(([_, state]) =>
        this.counterApiService.saveCounter(state.counter).pipe(
          map(() => saveSuccess()),
          catchError((error) => of(saveError({ error }))),
        ),
      ),
    ),
  );
}
