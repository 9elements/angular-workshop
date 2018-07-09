import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
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

  it('renders an independant counter', () => {
    const el = fixture.debugElement.query(By.css('app-independant-counter'));
    expect(el).toBeTruthy();
  });

  it('renders a service counter', () => {
    const el = fixture.debugElement.query(By.css('app-service-counter'));
    expect(el).toBeTruthy();
  });

  it('renders a NgRx counter', () => {
    const el = fixture.debugElement.query(By.css('app-ngrx-counter'));
    expect(el).toBeTruthy();
  });

});
