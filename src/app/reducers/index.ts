import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../shared/app-state';
import { counterReducer } from './counter.reducer';

export const reducers: ActionReducerMap<AppState> = {
  counter: counterReducer,
};
