import { Action, createReducer, on } from '@ngrx/store';

import { decrement, increment, reset } from '../actions/counter.actions';

export type CounterState = number;

export const initialState: CounterState = 0;

const reducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (_, action) => action.count),
);

export function counterReducer(
  state: CounterState | undefined,
  action: Action,
): CounterState {
  return reducer(state, action);
}
