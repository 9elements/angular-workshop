import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of, throwError } from 'rxjs';
import { toArray } from 'rxjs/operators';

import {
  CounterSaveAction,
  Decrement,
  Increment,
  Reset,
  SaveError,
  SavePending,
  SaveSuccess,
} from '../actions/counter.actions';
import { AppState } from '../shared/app-state';
import { CounterEffects } from './counter.effects';

const apiError = new Error('API error');

const httpSuccessStub: Partial<HttpClient> = {
  get<T>(): Observable<T> {
    return of({} as T);
  }
};

const httpErrorStub: Partial<HttpClient> = {
  get() {
    return throwError(apiError);
  }
};

const state: AppState = { counter: 123456 };

const incAction = new Increment();
const decAction = new Decrement();
const resetAction = new Reset(5);
const pendingAction = new SavePending();
const successAction = new SaveSuccess();
const errorAction = new SaveError(apiError);

function setup(
  actions: Action[],
  http: Partial<HttpClient>
): CounterEffects {
  spyOn(http, 'get').and.callThrough();
  TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: http },
      { provide: Store, useValue: of(state) },
      provideMockActions(from(actions)),
      CounterEffects
    ]
  });
  return TestBed.get(CounterEffects);
}

function testSaveOnChange(
  actionsIn: Action[],
  http: Partial<HttpClient>,
  expectedActions: CounterSaveAction[]
) {
  const counterEffects = setup(actionsIn, http);
  counterEffects.saveOnChange$
    .pipe(toArray())
    .subscribe((actionsOut) => {
      expect(http.get).toHaveBeenCalledWith(
        `/assets/counter.json?counter=${state.counter}`
      );
      expect(actionsOut).toEqual(expectedActions);
    });
}

describe('CounterEffects', () => {

  it('saves the counter on increment', () => {
    testSaveOnChange(
      [ incAction ],
      httpSuccessStub,
      [ pendingAction, successAction ]
    );
  });

  it('saves the counter on decrement', () => {
    testSaveOnChange(
      [ decAction ],
      httpSuccessStub,
      [ pendingAction, successAction ]
    );
  });

  it('saves the counter on reset', () => {
    testSaveOnChange(
      [ resetAction ],
      httpSuccessStub,
      [ pendingAction, successAction ]
    );
  });

  it('does not save the counter on server errors', () => {
    testSaveOnChange(
      [ incAction ],
      httpErrorStub,
      [ pendingAction, errorAction ]
    );
  });

  it('handles multiple failures', () => {
    testSaveOnChange(
      [ incAction, decAction, resetAction ],
      httpErrorStub,
      [
        pendingAction, errorAction,
        pendingAction, errorAction,
        pendingAction, errorAction
      ]
    );
  });

});
