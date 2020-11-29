import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { take, toArray } from 'rxjs/operators';

import { CounterComponent } from './counter.component';

const startCount = 123;
const newCount = 456;

describe('CounterComponent with spectator', () => {
  let spectator: Spectator<CounterComponent>;

  function expectCount(count: number): void {
    expect(spectator.query(byTestId('count'))).toHaveText(String(count));
  }

  const createComponent = createComponentFactory({
    component: CounterComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({ props: { startCount } });
  });

  it('shows the start count', () => {
    expectCount(startCount);
  });

  it('increments the count', () => {
    spectator.click(byTestId('increment-button'));
    expectCount(startCount + 1);
  });

  it('decrements the count', () => {
    spectator.click(byTestId('decrement-button'));
    expectCount(startCount - 1);
  });

  it('resets the count', () => {
    spectator.click(byTestId('decrement-button'));
    spectator.typeInElement(String(newCount), byTestId('reset-input'));
    spectator.click(byTestId('reset-button'));
    expectCount(newCount);
  });

  it('does not reset if the value is not a number', () => {
    const value = 'not a number';
    spectator.typeInElement(String(value), byTestId('reset-input'));
    spectator.click(byTestId('reset-button'));
    expectCount(startCount);
  });

  it('emits countChange events', () => {
    let actualCounts: number[] | undefined;
    spectator.component.countChange.pipe(take(3), toArray()).subscribe((counts) => {
      actualCounts = counts;
    });

    spectator.click(byTestId('increment-button'));
    spectator.click(byTestId('decrement-button'));
    spectator.typeInElement(String(newCount), byTestId('reset-input'));
    spectator.click(byTestId('reset-button'));

    expect(actualCounts).toEqual([startCount + 1, startCount, newCount]);
  });
});
