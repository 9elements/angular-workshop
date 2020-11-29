import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { CounterComponent } from '../counter/counter.component';
import { HomeComponent } from './home.component';

describe('HomeComponent with spectator and ng-mocks', () => {
  let counter: CounterComponent;

  let spectator: Spectator<HomeComponent>;

  const createComponent = createComponentFactory({
    component: HomeComponent,
    declarations: [MockComponent(CounterComponent)],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
    const maybeCounter = spectator.query(CounterComponent);
    if (!maybeCounter) {
      throw new Error('CounterComponent not found');
    }
    counter = maybeCounter;
  });

  it('renders an independent counter', () => {
    expect(counter).toBeTruthy();
  });

  it('passes a start count', () => {
    expect(counter.startCount).toBe(5);
  });

  it('listens for count changes', () => {
    spyOn(console, 'log');
    const count = 5;
    counter.countChange.emit(count);
    expect(console.log).toHaveBeenCalledWith(
      'countChange event from CounterComponent',
      count,
    );
  });
});
