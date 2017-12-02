import { sampleTime } from 'rxjs/operator/sampleTime';
import { TestBed } from '@angular/core/testing';
import { Http, Response, ResponseOptions } from '@angular/http';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CounterSaveAction, Decrement, Increment, Reset, SavePending, SaveSuccess } from '../actions/counter.actions';
import { SaveError } from './../actions/counter.actions';
import { AppState } from './../shared/app-state';
import { CounterEffects } from './counter.effects';

const apiError = new Error('API error');

const httpSuccessStub: Partial<Http> = {
  get(): Observable<Response> {
    return Observable.of(
      new Response(
        new ResponseOptions({ status: 200, body: '' })
      )
    );
  }
};

const httpErrorStub: Partial<Http> = {
  get() {
    return Observable.throw(apiError);
  }
};

const state: AppState = { counter: 123456 };

function setup(action: Action, http: Partial<Http>): CounterEffects {
  spyOn(http, 'get').and.callThrough();
  TestBed.configureTestingModule({
    providers: [
      { provide: Http, useValue: http },
      { provide: Store, useValue: Observable.of(state) },
      provideMockActions(Observable.of(action)),
      CounterEffects
    ]
  });
  return TestBed.get(CounterEffects);
}

function testSaveOnChange(
  action: Action, http: Partial<Http>, expectedActions: CounterSaveAction[]
) {
  const counterEffects = setup(action, http);
  counterEffects.saveOnChange$.toArray().subscribe((actions) => {
    expect(http.get).toHaveBeenCalledWith(
      `/assets/counter.json?counter=${state.counter}`
    );
    expect(actions).toEqual(expectedActions);
  });

}

describe('CounterEffects', () => {

  it('saves the counter on increment', () => {
    testSaveOnChange(
      new Increment(),
      httpSuccessStub,
      [ new SavePending(), new SaveSuccess() ]
    );
  });

  it('saves the counter on decrement', () => {
    testSaveOnChange(
      new Decrement(),
      httpSuccessStub,
      [ new SavePending(), new SaveSuccess() ]
    );
  });

  it('saves the counter on reset', () => {
    testSaveOnChange(
      new Reset(5),
      httpSuccessStub,
      [ new SavePending(), new SaveSuccess() ]
    );
  });

  it('does not save the counter on server errors', () => {
    testSaveOnChange(
      new Increment(),
      httpErrorStub,
      [ new SavePending(), new SaveError(apiError) ]
    );
  });

});
