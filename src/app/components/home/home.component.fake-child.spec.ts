import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CounterComponent } from '../counter/counter.component';
import { HomeComponent } from './home.component';

@Component({
  selector: 'app-counter',
  template: '',
})
class FakeCounterComponent implements Partial<CounterComponent> {
  @Input()
  public startCount = 0;

  @Output()
  public countChange = new EventEmitter<number>();
}

describe('HomeComponent (faking a child Component)', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let counter: FakeCounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, FakeCounterComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const counterEl = fixture.debugElement.query(By.directive(FakeCounterComponent));
    counter = counterEl.componentInstance;
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
