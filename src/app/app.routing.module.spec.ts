import { APP_BASE_HREF, Location } from '@angular/common';
import { Component, forwardRef, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppRoutingModule, routes } from './app.routing.module';
import { CounterComponent } from './components/counter/counter.component';
import { HomeComponent } from './components/home/home.component';
import { NgRxCounterComponent } from './components/ngrx-counter/ngrx-counter.component';
import { ServiceCounterComponent } from './components/service-counter/service-counter.component';
import { findComponent } from './spec-helpers/element.spec-helper';

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

@Component({
  template: '<router-outlet></router-outlet>',
})
class RouterOutletComponent {}

function fakeComponent<T>(component: Type<T>): Type<T> {
  @Component({
    providers: [
      {
        provide: component,
        useExisting: forwardRef(() => FakeComponent),
      },
    ],
  })
  class FakeComponent {}

  return FakeComponent as Type<T>;
}

// Replace all components in the routes with a fake
const fakeRoutes: Routes = routes.map((route) => ({
  ...route,
  // tslint:disable-next-line: no-non-null-assertion
  component: fakeComponent(route.component!),
}));

describe('AppRoutingModule: routes', () => {
  let fixture: ComponentFixture<RouterOutletComponent>;
  let router: Router;
  let location: Location;

  function expectComponent(component: Type<any>): void {
    expect(fixture.debugElement.query(By.directive(component))).toBeTruthy();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(fakeRoutes)],
      declarations: [RouterOutletComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(RouterOutletComponent);

    // Fixes necessary for https://github.com/angular/angular/issues/25837

    // tslint:disable-next-line: no-non-null-assertion
    fixture.ngZone!.run(() => {
      router.initialNavigation();
    });

    const originalNavigate = router.navigate;
    router.navigate = (commands, extras) => {
      let promise: Promise<boolean> = Promise.resolve(false);
      // tslint:disable-next-line: no-non-null-assertion
      fixture.ngZone!.run(() => {
        promise = originalNavigate.call(router, commands, extras);
      });
      return promise;
    };
  });

  it('routes / to the HomeComponent', async () => {
    await router.navigate(['']);
    expectComponent(HomeComponent);
  });

  it('routes /counter-component', async () => {
    await router.navigate(['counter-component']);
    expect(location.path()).toBe('/counter-component');
    expectComponent(CounterComponent);
  });

  it('routes /service-counter-component', async () => {
    await router.navigate(['service-counter-component']);
    expect(location.path()).toBe('/service-counter-component');
    expectComponent(ServiceCounterComponent);
  });

  it('routes /ngrx-counter-component', async () => {
    await router.navigate(['ngrx-counter-component']);
    expect(location.path()).toBe('/ngrx-counter-component');
    expectComponent(NgRxCounterComponent);
  });
});
