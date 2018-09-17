import { BehaviorSubject } from 'rxjs';

/* istanbul ignore next */
export class MockStore<T> extends BehaviorSubject<T> {
  // Original signature:
  // dispatch<V extends Action = Action>(action: V): void {
  dispatch() {
    // Do nothing here. The call is recorded using a Jasmine spy.
  }
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

This mock store only implements the simplest API of an ngrx Store:
The `dispatch` method.
If the component needs a full ngrx store, please use the normal way
to create a fully-featured ngrx store:
https://github.com/ngrx/platform/blob/master/docs/store/testing.md
*/
export function makeMockStore<T>(state: T): MockStore<T> {
  const store = new MockStore<T>(state);
  spyOn(store, 'dispatch');
  return store;
}
