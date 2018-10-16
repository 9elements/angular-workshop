import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CounterApiService } from './counter-api.service';

const counter = 5;
const expectedURL = `/assets/counter.json?counter=${counter}`;
const serverResponse = {};

const errorEvent = new ErrorEvent('API error');

describe('CounterApiService', () => {
  let counterApiService: CounterApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CounterApiService]
    });

    counterApiService = TestBed.get(CounterApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('saves the counter', () => {
    counterApiService.saveCounter(counter).subscribe(
      (result) => {
        expect(result).toBe(serverResponse);
      }
    );

    const request = httpMock.expectOne({ method: 'GET', url: expectedURL });
    request.flush(serverResponse);
    httpMock.verify();
  });

  it('handles save counter errors', () => {
    counterApiService.saveCounter(counter).subscribe(
      fail,
      (error) => {
        expect(error).toEqual(
          new HttpErrorResponse({
            error: errorEvent,
            url: expectedURL,
            status: 0,
            statusText: ''
          })
        );
    });

    const request = httpMock.expectOne({ method: 'GET', url: expectedURL });
    request.error(errorEvent);
    httpMock.verify();
  });

});
