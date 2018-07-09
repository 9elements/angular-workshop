import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { Decrement, Increment, Reset } from '../actions/counter.actions';
import { CounterState } from '../reducers/counter.reducer';
import { AppState } from '../shared/app-state';
import { findEl } from '../shared/helpers.spec';
import { makeMockStore } from '../spec-helpers/make-mock-store.spec-helper';
import { NgRxCounterComponent } from './ngrx-counter.component';

const mockState: AppState = {
  counter: 5
};

describe('NgRxCounterComponent', () => {
  let fixture: ComponentFixture<NgRxCounterComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: makeMockStore(mockState) }
      ],
      declarations: [ NgRxCounterComponent ]
    }).compileComponents();

    store = TestBed.get(Store);

    fixture = TestBed.createComponent(NgRxCounterComponent);
    fixture.detectChanges();
  }));

  it('shows the count', () => {
    expect(findEl(fixture, 'count').nativeElement.textContent).toBe(
      String(mockState.counter)
    );
  });

  it('dispatches an Increment action', () => {
    findEl(fixture, 'increment-button').triggerEventHandler('click', null);
    expect(store.dispatch).toHaveBeenCalledWith(new Increment());
  });

  it('dispatches a Decrement action', () => {
    findEl(fixture, 'decrement-button').triggerEventHandler('click', null);
    expect(store.dispatch).toHaveBeenCalledWith(new Decrement());
  });

  it('dispatches a Reset action', () => {
    const value = 15;
    findEl(fixture, 'reset-input').nativeElement.value = value;
    findEl(fixture, 'reset-button').triggerEventHandler('click', null);
    expect(store.dispatch).toHaveBeenCalledWith(new Reset(value));
  });

  it('does not dispatch a Reset action if the value is not a number', () => {
    const value = 'lol';
    findEl(fixture, 'reset-input').nativeElement.value = value;
    findEl(fixture, 'reset-button').triggerEventHandler('click', null);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

});
