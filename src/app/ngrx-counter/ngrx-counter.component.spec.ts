import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { Decrement, Increment, Reset } from '../actions/counter.actions';
import { AppState } from '../shared/app-state';
import { click, expectText, findEl } from '../spec-helpers/element.spec-helper';
import { provideMockStore } from '../spec-helpers/mock-store.spec-helper';
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
    expect(store.dispatch).toHaveBeenCalledWith(new Increment());
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    expect(store.dispatch).toHaveBeenCalledWith(new Decrement());
  });

  it('resets the count', () => {
    const value = 15;
    findEl(fixture, 'reset-input').nativeElement.value = value;
    click(fixture, 'reset-button');
    expect(store.dispatch).toHaveBeenCalledWith(new Reset(value));
  });

  it('does not reset if the value is not a number', () => {
    const value = 'lol';
    findEl(fixture, 'reset-input').nativeElement.value = value;
    click(fixture, 'reset-button');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

});
