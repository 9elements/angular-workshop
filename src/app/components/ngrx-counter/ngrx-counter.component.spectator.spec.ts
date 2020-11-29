import { TestBed } from '@angular/core/testing';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { decrement, increment, reset } from '../../actions/counter.actions';
import { AppState } from '../../shared/app-state';
import { NgRxCounterComponent } from './ngrx-counter.component';

const mockState: AppState = {
  counter: 5,
};

const newCount = 15;

describe('NgRxCounterComponent with spectator', () => {
  let spectator: Spectator<NgRxCounterComponent>;

  let store: Store<AppState>;

  const createComponent = createComponentFactory({
    component: NgRxCounterComponent,
    providers: [provideMockStore({ initialState: mockState })],
    shallow: true,
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');

    spectator = createComponent();
  });

  it('shows the count', () => {
    expect(spectator.query(byTestId('count'))).toHaveText(String(mockState.counter));
  });

  it('increments the count', () => {
    spectator.click(byTestId('increment-button'));
    expect(store.dispatch).toHaveBeenCalledWith(increment());
  });

  it('decrements the count', () => {
    spectator.click(byTestId('decrement-button'));
    expect(store.dispatch).toHaveBeenCalledWith(decrement());
  });

  it('resets the count', () => {
    spectator.typeInElement(String(newCount), byTestId('reset-input'));
    spectator.click(byTestId('reset-button'));

    expect(store.dispatch).toHaveBeenCalledWith(reset({ count: newCount }));
  });

  it('does not reset if the value is not a number', () => {
    const value = 'not a number';
    spectator.typeInElement(String(value), byTestId('reset-input'));
    spectator.click(byTestId('reset-button'));

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
