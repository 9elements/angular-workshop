import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Increment } from '../actions/counter.actions';
import { CounterState } from '../reducers/counter.reducer';
import { makeMockStore } from '../spec-helpers/make-mock-store.spec-helper';
import { Decrement, Reset } from './../actions/counter.actions';
import { AppState } from './../shared/app-state';
import { NgRxCounterComponent } from './ngrx-counter.component';

const mockState: AppState = {
  counter: <CounterState> 5
};

describe('NgRxCounterComponent', () => {
  let fixture: ComponentFixture<NgRxCounterComponent>;
  let store: Store<AppState>;

  function findEl(attribute: string): DebugElement {
    return fixture.debugElement.query(By.css(`[data-qa="${attribute}"]`));
  }

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

  it('shows the counter value', () => {
    expect(findEl('counter').nativeElement.textContent).toBe(
      String(mockState.counter)
    );
  });

  it('dispatches an Increment action', () => {
    findEl('incrementButton').triggerEventHandler('click', {});
    expect(store.dispatch).toHaveBeenCalledWith(new Increment());
  });

  it('dispatches a Decrement action', () => {
    findEl('decrementButton').triggerEventHandler('click', {});
    expect(store.dispatch).toHaveBeenCalledWith(new Decrement());
  });

  it('dispatches a Reset action', () => {
    const value = 15;
    findEl('resetInput').nativeElement.value = value;
    findEl('resetButton').triggerEventHandler('click', {});
    expect(store.dispatch).toHaveBeenCalledWith(new Reset(value));
  });

});
