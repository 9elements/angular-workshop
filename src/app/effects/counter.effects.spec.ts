import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { from, Observable, of, throwError } from 'rxjs';
import { toArray } from 'rxjs/operators';

import {
  decrement,
  increment,
  reset,
  saveError,
  saveSuccess,
} from '../actions/counter.actions';
import { CounterApiService } from '../services/counter-api.service';
import { AppState } from '../shared/app-state';
import { CounterEffects } from './counter.effects';

const counter = 1;
const mockState: Partial<AppState> = { counter };

const apiError = new Error('API Error');

const incAction = increment();
const decAction = decrement();
const resetAction = reset({ count: 5 });
const successAction = saveSuccess();
const errorAction = saveError({ error: apiError });

function expectActions(effect: Observable<Action>, actions: Action[]): void {
  let actualActions: Action[] | undefined;
  effect.pipe(toArray()).subscribe((actualActions2) => {
    actualActions = actualActions2;
  }, fail);
  expect(actualActions).toEqual(actions);
}

// Mocks for CounterApiService

type PartialCounterApiService = Pick<CounterApiService, keyof CounterApiService>;

const mockCounterApi: PartialCounterApiService = {
  saveCounter(): Observable<{}> {
    return of({});
  },
};

const mockCounterApiError: PartialCounterApiService = {
  saveCounter(): Observable<never> {
    return throwError(apiError);
  },
};

function setup(actions: Action[], counterApi: PartialCounterApiService): CounterEffects {
  spyOn(counterApi, 'saveCounter').and.callThrough();

  TestBed.configureTestingModule({
    providers: [
      provideMockActions(from(actions)),
      provideMockStore({ initialState: mockState }),
      { provide: CounterApiService, useValue: counterApi },
      CounterEffects,
    ],
  });

  return TestBed.inject(CounterEffects);
}

function expectSaveOnChange(action: Action, counterApi: PartialCounterApiService): void {
  const counterEffects = setup([action], counterApi);

  expectActions(counterEffects.saveOnChange$, [successAction]);

  expect(counterApi.saveCounter).toHaveBeenCalledWith(counter);
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
    const actions = [incAction, incAction, incAction];
    const counterEffects = setup(actions, mockCounterApiError);

    expectActions(counterEffects.saveOnChange$, [errorAction, errorAction, errorAction]);

    expect(mockCounterApiError.saveCounter).toHaveBeenCalledWith(counter);
  });
});
