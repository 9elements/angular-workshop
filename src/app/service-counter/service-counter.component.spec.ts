import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCounterComponent } from './service-counter.component';

describe('ServiceCounterComponent', () => {
  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CServiceounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
