import { Action } from '@ngrx/store';

import { DECREMENT, INCREMENT, RESET, Reset } from '../actions/counter.actions';

export type CounterState = number;

export const initialState: CounterState = 0;

export function counterReducer(
  state: CounterState | undefined = initialState,
  action: Action
): CounterState {
  switch (action.type) {
    case INCREMENT:
      return state + 1;

    case DECREMENT:
      return state - 1;

    case RESET:
      return (action as Reset).payload;

    default:
      return state;
  }
}
