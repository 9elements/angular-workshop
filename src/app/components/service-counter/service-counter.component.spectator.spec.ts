import { TestBed } from '@angular/core/testing';
import {
  byTestId,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { of } from 'rxjs';

import { CounterService } from '../../services/counter.service';
import { ServiceCounterComponent } from './service-counter.component';

const newCount = 123;

describe('ServiceCounterComponent: integration test with spectator', () => {
  let spectator: Spectator<ServiceCounterComponent>;

  function expectCount(count: number): void {
    expect(spectator.query(byTestId('count'))).toHaveText(String(count));
  }

  const createComponent = createComponentFactory({
    component: ServiceCounterComponent,
    providers: [CounterService],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('shows the start count', () => {
    expectCount(0);
  });

  it('increments the count', () => {
    spectator.click(byTestId('increment-button'));
    expectCount(1);
  });

  it('decrements the count', () => {
    spectator.click(byTestId('decrement-button'));
    expectCount(-1);
  });

  it('resets the count', () => {
    spectator.typeInElement(String(newCount), byTestId('reset-input'));
    spectator.click(byTestId('reset-button'));

    expectCount(newCount);
  });
});

describe('ServiceCounterComponent: unit test with spectator', () => {
  let spectator: Spectator<ServiceCounterComponent>;

  function expectCount(count: number): void {
    expect(spectator.query(byTestId('count'))).toHaveText(String(count));
  }

  let counterService: Pick<CounterService, keyof CounterService>;

  const createComponent = createComponentFactory({
    component: ServiceCounterComponent,
    providers: [mockProvider(CounterService)],
  });

  beforeEach(() => {
    counterService = TestBed.inject(CounterService);
    (counterService as jasmine.SpyObj<CounterService>).getCount.and.returnValue(of(0));

    spectator = createComponent();
  });

  it('shows the start count', () => {
    expectCount(0);
    expect(counterService.getCount).toHaveBeenCalled();
  });

  it('increments the count', () => {
    spectator.click(byTestId('increment-button'));

    // No count expectation here since the fake method does not do anything
    expect(counterService.increment).toHaveBeenCalled();
  });

  it('decrements the count', () => {
    spectator.click(byTestId('decrement-button'));

    // No count expectation here since the fake method does not do anything
    expect(counterService.decrement).toHaveBeenCalled();
  });

  it('resets the count', () => {
    spectator.typeInElement(String(newCount), byTestId('reset-input'));
    spectator.click(byTestId('reset-button'));

    // No count expectation here since the fake method does not do anything
    expect(counterService.reset).toHaveBeenCalled();
  });

  it('does not reset if the value is not a number', () => {
    const value = 'not a number';
    spectator.typeInElement(value, byTestId('reset-input'));
    spectator.click(byTestId('reset-button'));

    expect(counterService.reset).not.toHaveBeenCalled();
  });
});
