import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';

/* istanbul ignore next */
export class MockStore<T> extends ReplaySubject<T> {
  // Method copied from ngrx Store:
  // https://github.com/ngrx/platform/blob/master/modules/store/src/store.ts
  // MIT-licensed like ngrx:
  // https://github.com/ngrx/platform/blob/master/LICENSE
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

  // Original signature:
  // dispatch<V extends Action = Action>(action: V): void {
  dispatch() {
    // Do nothing here. The call is recorded using a Jasmine spy.
  }
}

// Function copied from ngrx Store:
// https://github.com/ngrx/platform/blob/master/modules/store/src/store.ts
// MIT-licensed like ngrx:
// https://github.com/ngrx/platform/blob/master/LICENSE
function select<T, K>(
  mapFn: (state: T) => K
): (source$: Observable<T>) => Observable<K>;
function select<T, a extends keyof T>(
  key: a
): (source$: Observable<T>) => Observable<T[a]>;
function select<T, a extends keyof T, b extends keyof T[a]>(
  key1: a,
  key2: b
): (source$: Observable<T>) => Observable<T[a][b]>;
function select<
  T,
  a extends keyof T,
  b extends keyof T[a],
  c extends keyof T[a][b]
>(
  key1: a,
  key2: b,
  key3: c
): (source$: Observable<T>) => Observable<T[a][b][c]>;
function select<
  T,
  a extends keyof T,
  b extends keyof T[a],
  c extends keyof T[a][b],
  d extends keyof T[a][b][c]
>(
  key1: a,
  key2: b,
  key3: c,
  key4: d
): (source$: Observable<T>) => Observable<T[a][b][c][d]>;
function select<
  T,
  a extends keyof T,
  b extends keyof T[a],
  c extends keyof T[a][b],
  d extends keyof T[a][b][c],
  e extends keyof T[a][b][c][d]
>(
  key1: a,
  key2: b,
  key3: c,
  key4: d,
  key5: e
): (source$: Observable<T>) => Observable<T[a][b][c][d][e]>;
function select<
  T,
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
): (source$: Observable<T>) => Observable<T[a][b][c][d][e][f]>;
/**
 * This overload is used to support spread operator with
 * fixed length tuples type in typescript 2.7
 */
function select<T, K = any>(
  ...paths: string[]
): (source$: Observable<T>) => Observable<K>;
/* istanbul ignore next */
function select<T, K>(
  pathOrMapFn: ((state: T) => any) | string,
  ...paths: string[]
) {
  return function selectOperator(source$: Observable<T>): Observable<K> {
    let mapped$: Observable<any>;

    if (typeof pathOrMapFn === 'string') {
      mapped$ = source$.pipe(pluck(pathOrMapFn, ...paths));
    } else if (typeof pathOrMapFn === 'function') {
      mapped$ = source$.pipe(map(pathOrMapFn));
    } else {
      throw new TypeError(
        `Unexpected type '${typeof pathOrMapFn}' in select operator,` +
          ` expected 'string' or 'function'`
      );
    }

    return mapped$.pipe(distinctUntilChanged());
  };
}

/*
Returns a mock ngrx Store with the given state.
For testing components and directives that require the ngrx Store.

How to use this:

Create a mock state with just the relevant subtree:

const mockState: Partial<AppState> = {
  part: { ... }
};

Create a mock store and provide it as a value for the Store dependency:

TestBed.configureTestingModule({
  providers: [
    { provide: Store, useValue: makeMockStore(mockState) }
  ],
  declarations: [ MyComponentUnderTest ]
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

This mock store only implements the simplest API of an ngrx Store:
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
