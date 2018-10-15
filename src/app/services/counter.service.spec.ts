import { async, TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { CounterService } from './counter.service';

describe('CounterService', () => {
  let counterService: CounterService;

  // Returns an observable that completes after the first value.
  // You don’t need to unsubscribe manually.
  function getCount() {
    return counterService.getCount().pipe(first());
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CounterService ]
    });
    counterService = TestBed.get(CounterService);
  });

  it('returns the count', async(() => {
    getCount().subscribe((count) => {
      expect(count).toBe(0);
    });
  }));

  it('increments the count', async(() => {
    counterService.increment();
    getCount().subscribe((count) => {
      expect(count).toBe(1);
    });
  }));

  it('decrements the count', async(() => {
    counterService.decrement();
    getCount().subscribe((count) => {
      expect(count).toBe(-1);
    });
  }));

  it('resets the count', async(() => {
    const newCount = 123;
    counterService.reset(newCount);
    getCount().subscribe((count) => {
      expect(count).toBe(newCount);
    });
  }));

});
