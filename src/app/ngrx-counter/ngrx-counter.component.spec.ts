import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { AppState } from '../shared/app-state';
import { click, expectText, findEl, setFieldValue } from '../spec-helpers/element.spec-helper';
import { provideMockStore } from '../spec-helpers/mock-store.spec-helper';
import { NgRxCounterComponent } from './ngrx-counter.component';
import { increment, decrement, reset } from '../actions/counter.actions';

const mockState: Partial<AppState> = {
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
        provideMockStore(mockState)
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
