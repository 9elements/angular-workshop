import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CounterApiService {
  constructor(private http: HttpClient) {}

  public saveCounter(counter: number): Observable<{}> {
    return this.http.get(`/assets/counter.json?counter=${counter}`);
  }
}
