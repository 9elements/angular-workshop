import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { Decrement, Increment, Reset } from '../actions/counter.actions';
import { AppState } from '../shared/app-state';
import { expectText, findEl } from '../spec-helpers/element.spec-helper';
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
      declarations: [ NgRxCounterComponent ],
      providers: [
        { provide: Store, useValue: makeMockStore(mockState) }
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    fixture = TestBed.createComponent(NgRxCounterComponent);
    fixture.detectChanges();
  }));

  it('shows the count', () => {
    expectText(fixture, 'count', String(mockState.counter));
  });

  it('increments the count', () => {
    findEl(fixture, 'increment-button').triggerEventHandler('click', null);
    expect(store.dispatch).toHaveBeenCalledWith(new Increment());
  });

  it('decrements the count', () => {
    findEl(fixture, 'decrement-button').triggerEventHandler('click', null);
    expect(store.dispatch).toHaveBeenCalledWith(new Decrement());
  });

  it('resets the count', () => {
    const value = 15;
    findEl(fixture, 'reset-input').nativeElement.value = value;
    findEl(fixture, 'reset-button').triggerEventHandler('click', null);
    expect(store.dispatch).toHaveBeenCalledWith(new Reset(value));
  });

  it('does not reset if the value is not a number', () => {
    const value = 'lol';
    findEl(fixture, 'reset-input').nativeElement.value = value;
    findEl(fixture, 'reset-button').triggerEventHandler('click', null);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

});
