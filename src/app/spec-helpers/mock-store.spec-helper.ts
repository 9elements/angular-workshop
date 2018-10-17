/* istanbul ignore file */

import { Provider } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

export class MockStore<T> extends BehaviorSubject<T> {
  // Original signature:
  // dispatch<V extends Action = Action>(action: V): void {
  dispatch() {
    // Do nothing here. The call is recorded using a Jasmine spy.
  }

  /*
  Method copied from NgRx Store:
  https://github.com/ngrx/platform/blob/master/modules/store/src/store.ts
  MIT-licensed like NgRx:
  https://github.com/ngrx/platform/blob/master/LICENSE
  */
  /**
   * @deprecated from 6.1.0. Use the pipeable `select` operator instead.
   */
  select<K>(mapFn: (state: T) => K): Observable<K>;
  select<a extends keyof T>(key: a): Observable<T[a]>;
  select<a extends keyof T, b extends keyof T[a]>(
    key1: a,
    key2: b
  ): Observable<T[a][b]>;
  select<a extends keyof T, b extends keyof T[a], c extends keyof T[a][b]>(
    key1: a,
    key2: b,
    key3: c
  ): Observable<T[a][b][c]>;
  select<
    a extends keyof T,
    b extends keyof T[a],
    c extends keyof T[a][b],
    d extends keyof T[a][b][c]
  >(key1: a, key2: b, key3: c, key4: d): Observable<T[a][b][c][d]>;
  select<
    a extends keyof T,
    b extends keyof T[a],
    c extends keyof T[a][b],
    d extends keyof T[a][b][c],
    e extends keyof T[a][b][c][d]
  >(key1: a, key2: b, key3: c, key4: d, key5: e): Observable<T[a][b][c][d][e]>;
  select<
    a extends keyof T,
    b extends keyof T[a],
    c extends keyof T[a][b],
    d extends keyof T[a][b][c],
    e extends keyof T[a][b][c][d],
    f extends keyof T[a][b][c][d][e]
  >(
    key1: a,
    key2: b,
    key3: c,
    key4: d,
    key5: e,
    key6: f
  ): Observable<T[a][b][c][d][e][f]>;
  /**
   * This overload is used to support spread operator with
   * fixed length tuples type in typescript 2.7
   */
  select<K = any>(...paths: string[]): Observable<K>;
  select(
    pathOrMapFn: ((state: T) => any) | string,
    ...paths: string[]
  ): Observable<any> {
    return select.call(null, pathOrMapFn, ...paths)(this);
  }
}

/*
Returns a mock NgRx Store with the given state.
For testing components and directives that require the NgRx Store.

How to use this:

Create a mock state with just the relevant subtree:

const mockState: Partial<AppState> = {
  part: { ... }
};

Create a mock store and provide it as a value for the Store dependency:

TestBed.configureTestingModule({
  declarations: [ MyComponentUnderTest ],
  providers: [
    { provide: Store, useValue: makeMockStore(mockState) }
  ]
})
.compileComponents();

The `dispatch` method is a no-op wrapped by a Jasmine spy.
To check if the component has dispatched an action:

const store: Store<AppState> = TestBed.get(Store);

expect(store.dispatch).toHaveBeenCalledWith(
  new SomeAction()
);
expect(store.dispatch).toHaveBeenCalledWith(
  new SomeAction(somePayload)
);

This mock store only implements the simplest API of an NgRx Store:
The `dispatch` method.
If the component needs a full NgRx store, please use the normal way
to create a fully-featured NgRx store:
https://github.com/ngrx/platform/blob/master/docs/store/testing.md
*/
export function makeMockStore<T>(state: T): MockStore<T> {
  const store = new MockStore<T>(state);
  spyOn(store, 'dispatch');
  return store;
}

/*
Returns a provider for the NgRx Store with a mock with the given state.
*/
export function provideMockStore<T>(state: T): Provider {
  return {
    provide: Store,
    useValue: makeMockStore(state)
  };
}
