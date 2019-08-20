import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { decrement, increment, reset } from '../actions/counter.actions';
import { AppState } from '../shared/app-state';
import { click, expectText, setFieldValue } from '../spec-helpers/element.spec-helper';
import { NgRxCounterComponent } from './ngrx-counter.component';

const mockState: AppState = {
  counter: 5
};

const newCount = 15;

describe('NgRxCounterComponent', () => {
  let fixture: ComponentFixture<NgRxCounterComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgRxCounterComponent ],
      providers: [
        provideMockStore({ initialState: mockState })
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store , 'dispatch');

    fixture = TestBed.createComponent(NgRxCounterComponent);
    fixture.detectChanges();
  }));

  it('shows the count', () => {
    expectText(fixture, 'count', String(mockState.counter));
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    expect(store.dispatch).toHaveBeenCalledWith(increment());
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    expect(store.dispatch).toHaveBeenCalledWith(decrement());
  });

  it('resets the count', () => {
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');

    expect(store.dispatch).toHaveBeenCalledWith(reset({ count: newCount }));
  });

  it('does not reset if the value is not a number', () => {
    const value = 'lol';
    setFieldValue(fixture, 'reset-input', value);
    click(fixture, 'reset-button');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

});
