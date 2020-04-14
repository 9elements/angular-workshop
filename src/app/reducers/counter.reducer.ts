import { createReducer, on } from '@ngrx/store';

import { decrement, increment, reset, CounterActions } from '../actions/counter.actions';

export type CounterState = number;

export const initialState: CounterState = 0;

const reducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (_, action) => action.count),
);

export function counterReducer(
  state: CounterState,
  action: CounterActions,
): CounterState {
  return reducer(state, action);
}
