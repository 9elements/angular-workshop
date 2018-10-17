import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of, throwError } from 'rxjs';
import { toArray } from 'rxjs/operators';

import { Decrement, Increment, Reset, SaveError, SaveSuccess } from '../actions/counter.actions';
import { CounterApiService } from '../services/counter-api.service';
import { AppState } from '../shared/app-state';
import { CounterEffects } from './counter.effects';

const mockState: Partial<AppState> = {
  counter: 1
};

const apiError = new Error('API Error');

const incAction = new Increment();
const decAction = new Decrement();
const resetAction = new Reset(5);
const successAction = new SaveSuccess();
const errorAction = new SaveError(apiError);

function expectActions(effect: Observable<Action>, actions: Action[]) {
  effect.pipe(toArray()).subscribe(
    (actualActions) => {
      expect(actualActions).toEqual(actions);
    },
    fail
  );
}

// Mocks for CounterApiService

const mockCounterApi: Partial<CounterApiService> = {
  saveCounter() {
    return of({});
  }
};

const mockCounterApiError: Partial<CounterApiService> = {
  saveCounter() {
    return throwError(apiError);
  }
};

function setup(
  actions: Action | Action[],
  counterApi: Partial<CounterApiService>
): CounterEffects {
  spyOn(counterApi, 'saveCounter').and.callThrough();

  TestBed.configureTestingModule({
    providers: [
      provideMockActions(
        from(Array.isArray(actions) ? actions : [ actions ])
      ),
      { provide: Store, useValue: of(mockState) },
      { provide: CounterApiService, useValue: counterApi },
      CounterEffects
    ]
  });

  return TestBed.get(CounterEffects);
}

function expectSaveOnChange(
  action: Action,
  counterApi: Partial<CounterApiService>
) {
  const counterEffects = setup(action, counterApi);

  expectActions(counterEffects.saveOnChange$, [ successAction ]);

  expect(counterApi.saveCounter).toHaveBeenCalledWith(mockState.counter);
}

describe('CounterEffects', () => {

  it('saves the counter on increment', () => {
    expectSaveOnChange(incAction, mockCounterApi);
  });

  it('saves the counter on decrement', () => {
    expectSaveOnChange(decAction, mockCounterApi);
  });

  it('saves the counter on reset', () => {
    expectSaveOnChange(resetAction, mockCounterApi);
  });

  it('handles an API error', () => {
    const actions = [ incAction, incAction, incAction ];
    const counterEffects = setup(actions, mockCounterApiError);

    expectActions(counterEffects.saveOnChange$, [
      errorAction,
      errorAction,
      errorAction
    ]);

    expect(mockCounterApiError.saveCounter).toHaveBeenCalledWith(mockState.counter);
  });

});
