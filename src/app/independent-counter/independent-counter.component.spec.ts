import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentCounterComponent } from './independent-counter.component';

describe('IndependentCounterComponent', () => {
  let component: IndependentCounterComponent;
  let fixture: ComponentFixture<IndependentCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependentCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
