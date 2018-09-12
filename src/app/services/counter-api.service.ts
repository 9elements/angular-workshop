import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterApiService {

  constructor(private http: HttpClient) {}

  saveCounter(counter: number) {
    return this.http.get(`/assets/counter.json?counter=${counter}`);
  }

}
