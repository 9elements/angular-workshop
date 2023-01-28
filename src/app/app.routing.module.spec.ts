import {
  APP_BASE_HREF,
  Location,
} from '@angular/common';
import { Type } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import {
  AppRoutingModule,
  routes,
} from './app.routing.module';
import { CounterComponent } from './components/counter/counter.component';
import { HomeComponent } from './components/home/home.component';
import {
  NgRxCounterComponent,
} from './components/ngrx-counter/ngrx-counter.component';
import {
  ServiceCounterComponent,
} from './components/service-counter/service-counter.component';
import { CounterService } from './services/counter.service';

describe('AppRoutingModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    });
  });

  it('initializes', () => {
    const appRoutingModule = TestBed.inject(AppRoutingModule);
    expect(appRoutingModule).toBeTruthy();
  });
});

describe('AppRoutingModule: routes', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  function expectComponent(component: Type<any>): void {
    expect(fixture.debugElement.query(By.directive(component))).toBeTruthy();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent],
      providers: [CounterService, provideMockStore({ initialState: { counter: 5 } })],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fixture.ngZone!.run(() => {
      router.initialNavigation();
    });
  });

  it('routes / to the HomeComponent', async () => {
    await router.navigate(['']);
    fixture.detectChanges();
    expectComponent(HomeComponent);
  });

  it('routes /counter-component', async () => {
    await router.navigate(['counter-component']);
    fixture.detectChanges();
    expect(location.path()).toBe('/counter-component');
    expectComponent(CounterComponent);
  });

  it('routes /service-counter-component', async () => {
    await router.navigate(['service-counter-component']);
    fixture.detectChanges();
    expect(location.path()).toBe('/service-counter-component');
    expectComponent(ServiceCounterComponent);
  });

  it('routes /ngrx-counter-component', async () => {
    await router.navigate(['ngrx-counter-component']);
    fixture.detectChanges();
    expect(location.path()).toBe('/ngrx-counter-component');
    expectComponent(NgRxCounterComponent);
  });
});
