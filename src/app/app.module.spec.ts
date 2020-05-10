import { APP_BASE_HREF } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';

import { AppModule } from './app.module';

describe('AppModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    });
  }));

  it('initializes', () => {
    const appModule: AppModule = TestBed.get(AppModule);
    expect(appModule).toBeTruthy();
  });
});
