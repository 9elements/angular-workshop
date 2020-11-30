import { ComponentFixture, TestBed } from '@angular/core/testing';
import { take, toArray } from 'rxjs/operators';

import { click, expectText, setFieldValue } from '../../spec-helpers/element.spec-helper';
import { CounterComponent } from './counter.component';

const startCount = 123;
const newCount = 456;

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  function expectCount(count: number): void {
    expectText(fixture, 'count', String(count));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    component.startCount = startCount;
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('shows the start count', () => {
    expectCount(startCount);
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();
    expectCount(startCount + 1);
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectCount(startCount - 1);
  });

  it('resets the count', () => {
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges();
    expectCount(newCount);
  });

  it('does not reset if the value is not a number', () => {
    const value = 'not a number';
    setFieldValue(fixture, 'reset-input', value);
    click(fixture, 'reset-button');
    fixture.detectChanges();
    expectCount(startCount);
  });

  it('emits countChange events', () => {
    let actualCounts: number[] | undefined;
    component.countChange.pipe(take(3), toArray()).subscribe((counts) => {
      actualCounts = counts;
    });

    click(fixture, 'increment-button');
    click(fixture, 'decrement-button');
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');

    expect(actualCounts).toEqual([startCount + 1, startCount, newCount]);
  });
});
