import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import {
  BehaviorSubject,
  Observable,
  of,
} from 'rxjs';

import { CounterService } from '../../services/counter.service';
import {
  click,
  expectText,
  setFieldValue,
} from '../../spec-helpers/element.spec-helper';
import {
  StandaloneServiceCounterComponent,
} from './standalone-service-counter.component';

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

describe('StandaloneServiceCounterComponent: unit test', () => {
  const currentCount = 123;

  let fixture: ComponentFixture<StandaloneServiceCounterComponent>;
  // Declare shared variable
  let fakeCounterService: CounterService;

  beforeEach(async () => {
    // Create fake
    fakeCounterService = jasmine.createSpyObj<CounterService>('CounterService', {
      getCount: of(currentCount),
      increment: undefined,
      decrement: undefined,
      reset: undefined,
    });

    await TestBed.configureTestingModule({
      imports: [StandaloneServiceCounterComponent],
      // Use fake instead of original
      providers: [{ provide: CounterService, useValue: fakeCounterService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StandaloneServiceCounterComponent);
    fixture.detectChanges();
  });

  it('shows the count', () => {
    expectText(fixture, 'count', String(currentCount));
    expect(fakeCounterService.getCount).toHaveBeenCalled();
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    expect(fakeCounterService.increment).toHaveBeenCalled();
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    expect(fakeCounterService.decrement).toHaveBeenCalled();
  });

  it('resets the count', () => {
    const newCount = 456;
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    expect(fakeCounterService.reset).toHaveBeenCalledWith(newCount);
  });
});

describe('StandaloneServiceCounterComponent: unit test with minimal Service logic', () => {
  const newCount = 456;

  let fixture: ComponentFixture<StandaloneServiceCounterComponent>;

  let fakeCount$: BehaviorSubject<number>;
  let fakeCounterService: Pick<CounterService, keyof CounterService>;

  beforeEach(async () => {
    fakeCount$ = new BehaviorSubject(0);

    fakeCounterService = {
      getCount(): Observable<number> {
        return fakeCount$;
      },
      increment(): void {
        fakeCount$.next(1);
      },
      decrement(): void {
        fakeCount$.next(-1);
      },
      reset(): void {
        fakeCount$.next(Number(newCount));
      },
    };
    spyOn(fakeCounterService, 'getCount').and.callThrough();
    spyOn(fakeCounterService, 'increment').and.callThrough();
    spyOn(fakeCounterService, 'decrement').and.callThrough();
    spyOn(fakeCounterService, 'reset').and.callThrough();

    await TestBed.configureTestingModule({
      imports: [StandaloneServiceCounterComponent],
      providers: [{ provide: CounterService, useValue: fakeCounterService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StandaloneServiceCounterComponent);
    fixture.detectChanges();
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', '0');
    expect(fakeCounterService.getCount).toHaveBeenCalled();
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();

    expectText(fixture, 'count', '1');
    expect(fakeCounterService.increment).toHaveBeenCalled();
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();

    expectText(fixture, 'count', '-1');
    expect(fakeCounterService.decrement).toHaveBeenCalled();
  });

  it('resets the count', () => {
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    fixture.detectChanges();

    expectText(fixture, 'count', String(newCount));
    expect(fakeCounterService.reset).toHaveBeenCalledWith(newCount);
  });

  it('does not reset if the value is not a number', () => {
    const value = 'not a number';
    setFieldValue(fixture, 'reset-input', value);
    click(fixture, 'reset-button');

    expect(fakeCounterService.reset).not.toHaveBeenCalled();
  });
});
