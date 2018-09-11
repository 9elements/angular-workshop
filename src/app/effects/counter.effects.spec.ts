import { HttpClientModule, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';

import { Decrement, Increment, Reset, SaveError, SavePending, SaveSuccess } from '../actions/counter.actions';
import { AppState } from '../shared/app-state';
import { CounterEffects } from './counter.effects';

const apiErrorEvent = new ErrorEvent('API error');

const mockState: Partial<AppState> = {
  counter: 1
};

const expectedURL = `/assets/counter.json?counter=${mockState.counter}`;

const incAction = new Increment();
const decAction = new Decrement();
const resetAction = new Reset(5);
const pendingAction = new SavePending();
const successAction = new SaveSuccess();
const errorAction = new SaveError(
  new HttpErrorResponse({
    error: apiErrorEvent,
    url: expectedURL,
    status: 0,
    statusText: ''
  })
);

function expectActions(effect: Observable<Action>, actions: Action[]) {
  effect.pipe(toArray()).subscribe(
    (actualActions) => {
      expect(actualActions).toEqual(actions);
    },
    fail
  );
}

function setup(actions: Action | Action[]) {
  TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [
      { provide: Store, useValue: of(mockState) },
      provideMockActions(
        from(Array.isArray(actions) ? actions : [ actions ])
      ),
      CounterEffects
    ]
  });
  const counterEffects: CounterEffects = TestBed.get(CounterEffects);
  const httpMock: HttpTestingController = TestBed.get(HttpTestingController);

  return { counterEffects, httpMock };
}

function findRequest(candidateRequest: HttpRequest<any>) {
  return (
    candidateRequest.method === 'GET' &&
    candidateRequest.url === expectedURL
  );
}

function expectSave(counterEffects: CounterEffects, httpMock: HttpTestingController) {
  expectActions(counterEffects.saveOnChange$, [
    pendingAction,
    successAction
  ]);

  const request = httpMock.expectOne(findRequest);
  request.flush({});
  httpMock.verify();
}

describe('CounterEffects', () => {

  it('saves the counter on increment', () => {
    const { counterEffects, httpMock } = setup(incAction);
    expectSave(counterEffects, httpMock);
  });

  it('saves the counter on increment', () => {
    const { counterEffects, httpMock } = setup(decAction);
    expectSave(counterEffects, httpMock);
  });

  it('saves the counter on Reset', () => {
    const { counterEffects, httpMock } = setup(resetAction);
    expectSave(counterEffects, httpMock);
  });

  it('handles an API error', () => {
    const actions = [ incAction, incAction, incAction ];
    const { counterEffects, httpMock } = setup(actions);

    expectActions(counterEffects.saveOnChange$, [
      pendingAction, pendingAction, pendingAction,
      errorAction, errorAction, errorAction
    ]);

    const requests = httpMock.match(findRequest);
    expect(requests.length).toBe(actions.length);
    requests.forEach((request) => {
      request.error(apiErrorEvent);
    });
    httpMock.verify();
  });

});
