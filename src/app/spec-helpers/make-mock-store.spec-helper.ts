import { Action } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';

export class MockStore<T> extends ReplaySubject<T> {
  // Method copied from ngrx Store:
  // https://github.com/ngrx/platform/blob/master/modules/store/src/store.ts
  // MIT-licensed like ngrx:
  // https://github.com/ngrx/platform/blob/master/LICENSE
  select<K>(mapFn: (state: T) => K): MockStore<K>;
  select<a extends keyof T>(key: a): MockStore<T[a]>;
  select<a extends keyof T, b extends keyof T[a]>(
    key1: a,
    key2: b
  ): MockStore<T[a][b]>;
  select<a extends keyof T, b extends keyof T[a], c extends keyof T[a][b]>(
    key1: a,
    key2: b,
    key3: c
  ): MockStore<T[a][b][c]>;
  select<
    a extends keyof T,
    b extends keyof T[a],
    c extends keyof T[a][b],
    d extends keyof T[a][b][c]
  >(key1: a, key2: b, key3: c, key4: d): MockStore<T[a][b][c][d]>;
  select<
    a extends keyof T,
    b extends keyof T[a],
    c extends keyof T[a][b],
    d extends keyof T[a][b][c],
    e extends keyof T[a][b][c][d]
  >(key1: a, key2: b, key3: c, key4: d, key5: e): MockStore<T[a][b][c][d][e]>;
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
  ): MockStore<T[a][b][c][d][e][f]>;
  select(
    pathOrMapFn: ((state: T) => any) | string,
    ...paths: string[]
  ): MockStore<any> {
    let mapped$: MockStore<any>;

    if (typeof pathOrMapFn === 'string') {
      mapped$ = pluck.call(this, pathOrMapFn, ...paths);
    } else if (typeof pathOrMapFn === 'function') {
      mapped$ = map.call(this, pathOrMapFn);
    } else {
      throw new TypeError(
        `Unexpected type '${typeof pathOrMapFn}' in select operator,` +
          ` expected 'string' or 'function'`
      );
    }

    return distinctUntilChanged.call(mapped$);
  }

  dispatch<V extends Action = Action>(action: V): void {
    // Do nothing here. The call is recorded using a Jasmine spy.
  }
}

/*
Returns a mock NgRx Store with the given state.
For testing components and directives that require the NgRx Store.

How to use this:

Create a mock state with just the relevant subtree:

const mockState = {
  part: <PartState>{ ... }
};

Create a mock store and provide it as a value for the Store dependency:

TestBed.configureTestingModule({
  providers: {
    { provide: Store, useValue: makeMockStore(mockState) }
  },
  declarations: [ MyComponentUnderTest ]
})
.compileComponents();

The `dispatch` method is a no-op wrapped by a Jasmine spy.
To check if the component has dispatched an action:

const store: Store<typeof mockState> = TestBed.get(Store);

expect(store.dispatch).toHaveBeenCalledWith(
  new SomeAction()
);
expect(store.dispatch).toHaveBeenCalledWith(
  new SomeAction(somePayload)
);

This mock store only implements the simplest API of an NgRx Store:
`select` and `dispatch`.
If the component needs a full ngrx store, please use makeStoreModule()
to create a fully-featured ngrx store.
*/
export function makeMockStore<T>(state: T): MockStore<T> {
  const store = new MockStore<T>();
  store.next(state);
  spyOn(store, 'dispatch');
  return store;
}
