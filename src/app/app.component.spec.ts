import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { findComponent } from './spec-helpers/element.spec-helper';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('independent counter', () => {
    it('renders an independent counter', () => {
      const el = findComponent(fixture, 'app-independent-counter');
      expect(el).toBeTruthy();
    });

    it('passes a start count', () => {
      const el = findComponent(fixture, 'app-independent-counter');
      expect(el.properties.startCount).toBe(5);
    });

    it('listens for count changes', () => {
      spyOn(console, 'log');
      const el = findComponent(fixture, 'app-independent-counter');
      const count = 5;
      el.triggerEventHandler('countChange', 5);
      expect(console.log).toHaveBeenCalledWith(
        'countChange event from IndependentCounter',
        count,
      );
    });
  });

  it('renders a service counter', () => {
    const el = findComponent(fixture, 'app-service-counter');
    expect(el).toBeTruthy();
  });

  it('renders a NgRx counter', () => {
    const el = findComponent(fixture, 'app-ngrx-counter');
    expect(el).toBeTruthy();
  });
});
