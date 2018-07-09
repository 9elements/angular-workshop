import { TestBed } from '@angular/core/testing';

import { CounterService } from './counter.service';
import { first } from 'rxjs/operators';

describe('CounterService', () => {
  let counterService: CounterService;

  // Returns an observable that completes after the first value.
  // You don’t need to unsubscribe manually.
  function getCount() {
    return counterService.getCount().pipe(first());
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterService]
    });
    counterService = TestBed.get(CounterService);
  });

  it('returns the count', (done: DoneFn) => {
    getCount().subscribe((count) => {
      expect(count).toEqual(0);
      done();
    });
  });

  it('increments the count', (done: DoneFn) => {
    getCount().subscribe((count) => {
      expect(count).toEqual(0);
      done();
    });
  });

  it('increments the count', (done: DoneFn) => {
    counterService.increment();
    getCount().subscribe((count) => {
      expect(count).toEqual(1);
      done();
    });
  });

  it('decrements the count', (done: DoneFn) => {
    counterService.decrement();
    counterService.getCount().subscribe((count) => {
      expect(count).toEqual(-1);
      done();
    });
  });

  it('resets the count', (done: DoneFn) => {
    const newCount = 123;
    counterService.reset(newCount);
    counterService.getCount().subscribe((count) => {
      expect(count).toEqual(newCount);
      done();
    });
  });

});
