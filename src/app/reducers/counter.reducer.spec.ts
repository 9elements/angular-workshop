import { Decrement, Increment, Reset } from '../actions/counter.actions';
import { counterReducer, CounterState } from './counter.reducer';

describe('counterReducer', () => {

  it('increments', () => {
    const state: CounterState = 0;
    const newState = counterReducer(state, new Increment());
    expect(newState).toBe(1);
  });

  it('decrements', () => {
    const state: CounterState = 1;
    const newState = counterReducer(state, new Decrement());
    expect(newState).toBe(0);
  });

  it('resets', () => {
    const state: CounterState = 0;
    const newState = counterReducer(state, new Reset(5));
    expect(newState).toBe(5);
  });

});
