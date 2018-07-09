import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CounterService } from '../services/counter.service';
import { ServiceCounterComponent } from './service-counter.component';
import { findEl } from '../shared/helpers.spec';

const count = 123;
const newCount = 456;

const mockCounterService: Partial<CounterService> = {
  getCount() {
    return of(count);
  },
  increment() {},
  decrement() {},
  reset() {}
};

describe('ServiceCounterComponent', () => {
  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;

  beforeEach(async(() => {
    spyOn(mockCounterService, 'increment');
    spyOn(mockCounterService, 'decrement');
    spyOn(mockCounterService, 'reset');

    TestBed.configureTestingModule({
      declarations: [ ServiceCounterComponent ],
      providers: [
        { provide: CounterService, useValue: mockCounterService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the count', () => {
    expect(findEl(fixture, 'count').nativeElement.textContent).toBe(String(count));
  });

  it('increments the count', () => {
    findEl(fixture, 'increment-button').triggerEventHandler('click', null);
    expect(mockCounterService.increment).toHaveBeenCalled();
  });

  it('decrements the count', () => {
    findEl(fixture, 'decrement-button').triggerEventHandler('click', null);
    expect(mockCounterService.decrement).toHaveBeenCalled();
  });

  it('resets the count', () => {
    const input = findEl(fixture, 'reset-input');
    input.nativeElement.value = String(newCount);
    findEl(fixture, 'reset-button').triggerEventHandler('click', null);
    expect(mockCounterService.reset).toHaveBeenCalledWith(newCount);
  });
});
