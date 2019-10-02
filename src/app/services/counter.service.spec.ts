import { TestBed } from '@angular/core/testing';

import { CounterService } from './counter.service';

describe('CounterService', () => {
  let counterService: CounterService;

  function expectCount(count: number): void {
    let actualCount: number | undefined;
    counterService.getCount().subscribe((actualCount2) => {
      actualCount = actualCount2;
    });
    expect(actualCount).toBe(count);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    counterService = TestBed.get(CounterService);
  });

  it('returns the count', () => {
    expectCount(0);
  });

  it('increments the count', () => {
    counterService.increment();
    expectCount(1);
  });

  it('decrements the count', () => {
    counterService.decrement();
    expectCount(-1);
  });

  it('resets the count', () => {
    const newCount = 123;
    counterService.reset(newCount);
    expectCount(newCount);
  });

});
