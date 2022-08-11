import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { CounterService } from '../../services/counter.service';
import { click, expectText, setFieldValue } from '../../spec-helpers/element.spec-helper';
import { StandaloneServiceCounterComponent } from './standalone-service-counter.component';

describe('StandaloneServiceCounterComponent: integration test', () => {
  let fixture: ComponentFixture<StandaloneServiceCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandaloneServiceCounterComponent],
      providers: [CounterService],
    }).compileComponents();

    fixture = TestBed.createComponent(StandaloneServiceCounterComponent);
    fixture.detectChanges();
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', '0');
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '1');
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    expectText(fixture, 'count', '-1');
  });

  it('resets the count', () => {
    const newCount = 456;
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges();
    expectText(fixture, 'count', String(newCount));
  });
});

describe('StandaloneServiceCounterComponent: fake Service', () => {
  const newCount = 456;

  let fixture: ComponentFixture<StandaloneServiceCounterComponent>;

  let fakeCount$: BehaviorSubject<number>;
  let fakeCounterService: Pick<CounterService, keyof CounterService>;

  beforeEach(async () => {
    fakeCount$ = new BehaviorSubject(0);

    fakeCounterService = {
      getCount() {
        return fakeCount$;
      },
      increment() {
        fakeCount$.next(1);
      },
      decrement() {
        fakeCount$.next(-1);
      },
      reset() {
        fakeCount$.next(Number(newCount));
      },
    };

    await TestBed.configureTestingModule({
      imports: [StandaloneServiceCounterComponent],
      providers: [{ provide: CounterService, useValue: fakeCounterService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StandaloneServiceCounterComponent);
    fixture.detectChanges();
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', '0');
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();

    expectText(fixture, 'count', '1');
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();

    expectText(fixture, 'count', '-1');
  });

  it('resets the count', () => {
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges();

    expectText(fixture, 'count', String(newCount));
  });

  it('does not reset if the value is not a number', () => {
    const value = 'not a number';
    setFieldValue(fixture, 'reset-input', value);
    click(fixture, 'reset-button');

    expectText(fixture, 'count', '0');
  });
});
