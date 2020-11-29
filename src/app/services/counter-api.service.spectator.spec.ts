import { HttpErrorResponse } from '@angular/common/http';
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { CounterApiService } from './counter-api.service';

const counter = 5;
const expectedURL = `/assets/counter.json?counter=${counter}`;
const serverResponse = {};

const errorEvent = new ErrorEvent('API error');

describe('CounterApiService with spectator', () => {
  let spectator: SpectatorHttp<CounterApiService>;
  const createHttp = createHttpFactory(CounterApiService);

  beforeEach(() => {
    spectator = createHttp();
  });

  it('saves the counter', () => {
    let actualResult: any;
    spectator.service.saveCounter(counter).subscribe((result) => {
      actualResult = result;
    });

    const request = spectator.expectOne(expectedURL, HttpMethod.GET);
    request.flush(serverResponse);

    expect(actualResult).toBe(serverResponse);
  });

  it('handles save counter errors', () => {
    const status = 500;
    const statusText = 'Server error';

    let actualError: HttpErrorResponse | undefined;

    spectator.service.saveCounter(counter).subscribe(
      fail,
      (error: HttpErrorResponse) => {
        actualError = error;
      },
      fail,
    );

    const request = spectator.expectOne(expectedURL, HttpMethod.GET);
    request.error(errorEvent, { status, statusText });

    if (!actualError) {
      throw new Error('actualError not defined');
    }
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });
});
