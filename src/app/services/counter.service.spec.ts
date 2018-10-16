import { async, TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { CounterService } from './counter.service';

describe('CounterService', () => {
  let counterService: CounterService;

  function expectCount(count: number) {
    counterService.getCount().pipe(first()).subscribe((actualCount) => {
      expect(actualCount).toBe(count);
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    counterService = TestBed.get(CounterService);
  });

  it('returns the count', async(() => {
    expectCount(0);
  }));

  it('spec with no expectations', () => {
    console.log('spec with no expectations');
  });

  it('increments the count', async(() => {
    counterService.increment();
    expectCount(1);
  }));

  it('decrements the count', async(() => {
    counterService.decrement();
    expectCount(-1);
  }));

  it('resets the count', async(() => {
    const newCount = 123;
    counterService.reset(newCount);
    expectCount(newCount);
  }));

});
