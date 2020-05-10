import { decrement, increment, reset } from '../actions/counter.actions';
import { counterReducer, CounterState } from './counter.reducer';

describe('counterReducer', () => {
  it('returns an initial state', () => {
    const newState = counterReducer(undefined, { type: 'init' });
    expect(newState).toBe(0);
  });

  it('returns the current state', () => {
    const state: CounterState = 5;
    const newState = counterReducer(state, { type: 'unknown' });
    expect(newState).toBe(state);
  });

  it('increments', () => {
    const state: CounterState = 0;
    const newState = counterReducer(state, increment());
    expect(newState).toBe(1);
  });

  it('decrements', () => {
    const state: CounterState = 1;
    const newState = counterReducer(state, decrement());
    expect(newState).toBe(0);
  });

  it('resets', () => {
    const newCount: CounterState = 5;
    const state: CounterState = 0;
    const newState = counterReducer(state, reset({ count: newCount }));
    expect(newState).toBe(newCount);
  });
});
