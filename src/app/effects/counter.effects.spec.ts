import { TestBed } from '@angular/core/testing';
import { Http } from '@angular/http';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CounterState } from '../reducers/counter.reducer';
import { Increment, SaveError, SavePending, SaveSuccess } from './../actions/counter.actions';
import { CounterEffects } from './counter.effects';

const mockHttp = {
  post() {
    return Observable.of({});
  }
};

const apiError = new Error('API error');

const mockErrorHttp = {
  post() {
    return Observable.throw(apiError);
  }
};

const mockState = {
  counter: <CounterState> 5
};

function setup(action: Action, http: typeof mockHttp): CounterEffects {
  spyOn(http, 'post').and.callThrough();

  TestBed.configureTestingModule({
    providers: [
      { provide: Http, useValue: http },
      { provide: Store, useValue: Observable.of(mockState) },
      provideMockActions(Observable.of(action)),
      CounterEffects
    ]
  });

  return TestBed.get(CounterEffects);
}

describe('CounterEffects', () => {

  it('saves the counter value on change', () => {
    const counterEffects = setup(new Increment(), mockHttp);

    counterEffects.saveOnChange$.toArray().subscribe((actions) => {
      expect(actions).toEqual([
        new SavePending(),
        new SaveSuccess()
      ]);
      expect(mockHttp.post)
        .toHaveBeenCalledWith('/assets/counter.json', mockState);
    });
  });

  it('handles a login error', () => {
    const counterEffects = setup(new Increment(), mockErrorHttp);

    counterEffects.saveOnChange$.toArray().subscribe((actions) => {
      expect(actions).toEqual([
        new SavePending(),
        new SaveError(apiError)
      ]);
    });
    expect(mockErrorHttp.post)
      .toHaveBeenCalledWith('/assets/counter.json', mockState);
  });

});
