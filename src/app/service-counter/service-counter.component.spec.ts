import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterService } from './../services/counter.service';
import { ServiceCounterComponent } from './service-counter.component';

describe('ServiceCounterComponent', () => {
  let component: ServiceCounterComponent;
  let fixture: ComponentFixture<ServiceCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCounterComponent ],
      providers: [ CounterService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
